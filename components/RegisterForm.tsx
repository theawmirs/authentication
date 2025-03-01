import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800"
            >
              Create account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-900 hover:text-gray-700"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
