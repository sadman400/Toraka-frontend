'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={reset} size="lg" aria-label="Try again">
            Try Again
          </Button>
          <Button variant="outline" size="lg" asChild aria-label="Go home">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-muted rounded-lg text-left max-w-2xl">
            <summary className="cursor-pointer font-medium">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-sm overflow-auto">
              {error.message}
              {error.stack && (
                <>
                  {'\n\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </MainLayout>
  );
}
