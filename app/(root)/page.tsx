"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Zinso
          </h1>
          <p className="mt-2 text-lg text-slate-600">Simplify your workflow</p>
        </div>

        <Card className="border-slate-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Welcome
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access all Zinso features
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Link href="/login" passHref>
              <Button className="w-full">
                Login to continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-500">
          New to Zinso?{" "}
          <Link
            href="/register"
            className="font-medium text-black hover:text-gray-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
