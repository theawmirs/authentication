"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Zinso</h1>
          <p className="text-sm text-slate-500">Simplify your workflow</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>

          <div className="text-center text-sm text-slate-500">
            New to Zinso?{" "}
            <Link href="/register" className="text-slate-800 hover:underline">
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
