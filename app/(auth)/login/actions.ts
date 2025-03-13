"use server";

import { z } from "zod";

const testUser = {
  id: 1,
  phone: "1234567890",
  password: "password",
};

const loginSchema = z.object({
  phone: z.string().min(10).max(15),
  password: z.string().min(8).max(20),
});

export const login = async (prevState: any, fromData: FormData) => {};
export const logout = async () => {};
