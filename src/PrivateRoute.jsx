import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "./hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return (
      <div className="w-full h-[100vh] bg-black">
        <h2 className="text-white text-center pt-60 text-xl">Loading...</h2>
      </div>
    );
  }
  return loggedIn ? <Outlet /> : <Navigate to="/unauthorized" />;
}
