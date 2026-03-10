import React from 'react';
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let status = 500;
  let title = 'Something went wrong';
  let message =
    'An unexpected error occurred. Please try again or return to the homepage.';

  if (isRouteErrorResponse(error)) {
    status = error.status;

    if (status === 404) {
      title = 'Page Not Found';
      message = "The page you're looking for doesn’t exist or has been moved.";
    } else if (status === 401) {
      title = 'Unauthorized Access';
      message = 'You don’t have permission to access this page.';
    } else if (status === 500) {
      title = 'Server Error';
      message = 'Something went wrong on our end. Please try again later.';
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-lg shadow-xl border">
        <CardContent className="flex flex-col items-center text-center p-10 space-y-6">
          {/* Icon */}
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>

          {/* Status Code */}
          <h1 className="text-5xl font-bold tracking-tight">{status}</h1>

          {/* Title */}
          <h2 className="text-2xl font-semibold">{title}</h2>

          {/* Message */}
          <p className="text-muted-foreground">{message}</p>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>

            <Button onClick={() => navigate('/')}>
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;
