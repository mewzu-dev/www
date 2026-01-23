import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-6xl sm:text-7xl font-bold">404</h1>
            <p className="text-xl sm:text-2xl">Page Not Found</p>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist.
            </p>
            <div className="pt-4">
              <Link
                href="/en"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
