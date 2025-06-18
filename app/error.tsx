"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-muted/80 min-h-screen flex items-center justify-center">
      <div className="w-9/12 m-auto py-16">
        <Card>
          <CardHeader className="text-center">
            <AlertTriangle size={128} className="text-red-500  w-full" />
            <h2 className="text-6xl font-medium py-8 ">
              Oops! Something went wrong
            </h2>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl pb-8 px-12 font-medium ">
              An unexpected error occurred. Please try again later.
              <br />
              Message :
              <span className="text-red-500 animate-pulse ml-3">
                {error.message}
              </span>
            </p>
            <p>{error.stack}</p>
            <div className="space-x-4 mt-4">
              <Button onClick={() => reset()}>Try again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
