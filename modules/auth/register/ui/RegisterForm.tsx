import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import router from "next/router";

interface Data {
  phone: string;
  password: string;
  confirmPassword: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const schema = z
  .object({
    phone: z.string().min(10),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Data) => {
    try {
      await axios.post(`${API_URL}/auth/users`, {
        phone_number: data.phone,
        password: data.password,
      });

      toast.success("User created successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Please fill in your details to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  placeholder="phone"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full $ hover:bg-gray-800 cursor-pointer`}
            >
              Register
            </Button>
            <Link
              href="/login"
              className="block text-center text-sm text-gray-600 hover:text-gray-900 mt-4 transition-colors duration-200"
            >
              Already have an account?{" "}
              <span className="font-semibold underline">Sign in!</span>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
