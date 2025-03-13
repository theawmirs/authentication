'use client";';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/(auth)/login/actions";
import { useFormStatus } from "react-dom";

const LoginForm = () => {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
          <CardDescription>Please sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  placeholder="phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <SubmitButton />
            <Link
              href="/register"
              className="block text-center text-sm text-gray-600 hover:text-gray-900 mt-4 transition-colors duration-200"
            >
              Don't have an account?{" "}
              <span className="font-semibold underline">Register now!</span>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer"
      disabled={pending}
    >
      Login
    </Button>
  );
};

export default LoginForm;
