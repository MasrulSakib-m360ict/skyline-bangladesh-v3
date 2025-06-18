"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-muted/80 min-h-screen flex items-center justify-center">
      <div className="w-9/12 m-auto py-16">
        <Card>
          <CardHeader className="text-center">
            <h1 className="text-9xl font-bold ">404</h1>
            <h2 className="text-6xl font-medium py-8 ">Oops! Page not found</h2>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl pb-8 px-12 font-medium ">
              The page you are looking for does not exist. It might have been
              moved or deleted.
            </p>
            <div className="space-x-4">
              <Button>
                <Link href="/">Go back to home</Link>
              </Button>
              <Button variant="secondary">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
