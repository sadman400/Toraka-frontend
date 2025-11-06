import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild aria-label="Go home">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" size="lg" asChild aria-label="Browse content">
            <Link href="/browse">Browse Content</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
