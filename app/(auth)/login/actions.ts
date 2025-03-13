"use server";

import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const testUser = {
  id: "1",
  phone: "1234567890",
  password: "password",
};

const loginSchema = z.object({
  phone: z.string().min(10).max(15),
  password: z.string().min(8).max(20),
});

export const login = async (prevState: any, fromData: FormData) => {
  // Validate the form data using Zod
  const result = loginSchema.safeParse(Object.fromEntries(fromData));

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  const { phone, password } = result.data;

  // Simulate a login process
  if (phone !== testUser.phone || password !== testUser.password) {
    return {
      error: { phone: ["Invalid credentials"] },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
};
export const logout = async () => {};
