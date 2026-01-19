'use client';

import { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { parseFile } from '@/lib/import/parser';

export default function AdminImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [entityType, setEntityType] = useState('countries');
  const [preview, setPreview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const entityTypes = [
    { value: 'countries', label: 'Countries' },
    { value: 'regions', label: 'Regions' },
    { value: 'cities', label: 'Cities' },
    { value: 'hotels', label: 'Hotels' },
    { value: 'room_types', label: 'Room Types' },
    { value: 'placements', label: 'Placements' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(null);
      setError('');
      setSuccess('');
    }
  };

  const handlePreview = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const parsedData = await parseFile(file);
      
      const response = await fetch('/api/admin/import/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType,
          data: parsedData.rows,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to preview data');
      }

      setPreview({
        headers: parsedData.headers,
        preview: parsedData.preview,
        totalRows: parsedData.rows.length,
        validRows: result.data.length,
        errors: result.errors,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to preview file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    if (!file || !preview) {
      setError('Please preview the file first');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const parsedData = await parseFile(file);
      
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType,
          data: parsedData.rows,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to import data');
      }

      setSuccess(`Successfully imported ${result.count} records`);
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      setError(err.message || 'Failed to import data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Import Data</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Entity Type Selection */}
          <div>
            <label htmlFor="entityType" className="block text-sm font-medium text-gray-700 mb-2">
              Entity Type
            </label>
            <select
              id="entityType"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {entityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Select File (CSV or Excel)
            </label>
            <input
              id="file"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

        {/* File Info */}
        {file && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded">
            <FileText className="w-4 h-4" />
            <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePreview}
            disabled={!file || isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Preview'}
          </button>
          {preview && (
            <button
              onClick={handleImport}
              disabled={isLoading || preview.errors.length > 0}
              className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Import
            </button>
          )}
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-blue-600 mb-1">Total Rows</p>
              <p className="text-2xl font-bold text-blue-900">{preview.totalRows}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-green-600 mb-1">Valid Rows</p>
              <p className="text-2xl font-bold text-green-900">{preview.validRows}</p>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <p className="text-sm text-red-600 mb-1">Errors</p>
              <p className="text-2xl font-bold text-red-900">{preview.errors.length}</p>
            </div>
          </div>

          {/* Errors */}
          {preview.errors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-red-700">Errors</h3>
              <div className="bg-red-50 border border-red-200 rounded p-4 max-h-48 overflow-y-auto">
                <ul className="space-y-1 text-sm text-red-700">
                  {preview.errors.map((error: string, index: number) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Data Preview Table */}
          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold mb-2">Data Preview (first 10 rows)</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {preview.headers.map((header: string) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {preview.preview.map((row: any, index: number) => (
                  <tr key={index}>
                    {preview.headers.map((header: string) => (
                      <td
                        key={header}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {row[header] !== null && row[header] !== undefined
                          ? String(row[header])
                          : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
