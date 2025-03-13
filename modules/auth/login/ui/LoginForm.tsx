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

import Link from "next/link";

interface FormData {
  phone: string;
  password: string;
}

const schema = z.object({
  phone: z.string(),
  password: z.string().min(8),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
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
                <Label htmlFor="phone">Phone </Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  name="phone"
                  type="phone"
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
              className={`w-full ${"bg-gray-900"} hover:bg-gray-800 cursor-pointer`}
            >
              {"Sign in"}
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
