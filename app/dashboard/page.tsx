import { Button } from "@/components/ui/button";
import React from "react";
import { logout } from "../(auth)/login/actions";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button className="cursor-pointer" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
