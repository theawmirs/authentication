import React, { useState } from "react";
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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  username: string;
  password: string;
}

const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  //A function for faking a loading state
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await wait(1500);
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid username or password");
        console.error("Authentication error:", result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        toast.success("Signed in successfully");
        //Using router instead of window.location.href for seamless navigation
        router.push("/me");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
          <CardDescription>Please sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username </Label>
                <Input
                  {...register("username")}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  placeholder="username"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-500" : "bg-gray-900"
              } hover:bg-gray-800 cursor-pointer`}
            >
              {isLoading ? "Signin..." : "Sign in"}
            </Button>
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

export default LoginForm;
