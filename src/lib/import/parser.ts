import Papa from 'papaparse';
import ExcelJS from 'exceljs';
import { importConfigs, ImportConfig } from './config';

export interface ParsedData {
  headers: string[];
  rows: any[];
  preview: any[];
}

export async function parseFile(file: File): Promise<ParsedData> {
  const fileType = file.name.split('.').pop()?.toLowerCase();

  if (fileType === 'csv') {
    return parseCSV(file);
  } else if (fileType === 'xlsx' || fileType === 'xls') {
    return parseExcel(file);
  } else {
    throw new Error('Unsupported file format. Please upload CSV or Excel files.');
  }
}

async function parseCSV(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data as any[];
        const preview = rows.slice(0, 10);
        resolve({ headers, rows, preview });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

async function parseExcel(file: File): Promise<ParsedData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error('Excel file is empty');
    }

    const jsonData: any[][] = [];
    worksheet.eachRow((row, rowNumber) => {
      const rowData: any[] = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        rowData.push(cell.value);
      });
      jsonData.push(rowData);
    });

    if (jsonData.length === 0) {
      throw new Error('Excel file is empty');
    }

    const headers = jsonData[0] as string[];
    const rows = jsonData.slice(1).map((row) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    const preview = rows.slice(0, 10);
    return { headers, rows, preview };
  } catch (error) {
    throw new Error('Failed to parse Excel file');
  }
}

export function transformToDbFormat(
  rows: any[],
  entityType: string
): { data: any[]; errors: string[] } {
  const config = importConfigs[entityType];
  if (!config) {
    throw new Error(`Unknown entity type: ${entityType}`);
  }

  const transformedData: any[] = [];
  const errors: string[] = [];

  rows.forEach((row, index) => {
    const transformed: any = {};
    let hasError = false;

    config.columns.forEach((col) => {
      const value = row[col.csv];

      // Check required fields
      if (col.required && (value === undefined || value === null || value === '')) {
        errors.push(`Row ${index + 1}: Missing required field "${col.csv}"`);
        hasError = true;
        return;
      }

      // Transform value if transformer exists
      if (col.transform && value !== undefined && value !== null && value !== '') {
        try {
          transformed[col.db] = col.transform(value);
        } catch (error) {
          errors.push(`Row ${index + 1}: Invalid value for "${col.csv}"`);
          hasError = true;
        }
      } else if (value !== undefined && value !== null && value !== '') {
        transformed[col.db] = value;
      }
    });

    if (!hasError) {
      transformedData.push(transformed);
    }
  });

  return { data: transformedData, errors };
}
