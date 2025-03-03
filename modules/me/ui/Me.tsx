import React from "react";
import { LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface MeProp {
  data: Session | null;
}

const Me = ({ data }: MeProp) => {
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
              <span className="font-medium w-24">Username:</span>
              <span>{data?.user?.username}</span>
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
};

export default Me;
