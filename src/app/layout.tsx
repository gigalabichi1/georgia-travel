import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Georgia Travel - Explore Beautiful Georgia",
  description: "Discover the beauty of Georgia with our curated tour packages. Book your adventure today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
