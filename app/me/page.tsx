"use client";

import { signOut, useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { status, data } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="flex">
              <span className="font-medium w-24">Name:</span>
              <span>{data?.user?.name}</span>
            </p>
            <p className="flex">
              <span className="font-medium w-24">Email:</span>
              <span>{data?.user?.email}</span>
            </p>
            <p className="flex">
              <span className="font-medium w-24">User ID:</span>
              <span>{data?.user?.id}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button onClick={() => signOut()} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );
}
