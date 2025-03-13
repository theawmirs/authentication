import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication System",
  description: "A simple authentication system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}
