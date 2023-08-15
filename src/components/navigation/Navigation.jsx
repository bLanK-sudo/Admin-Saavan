"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function Navigation() {
  const { token, status, setToken, setStatus } = useAuth();

  const handleLogout = () => {
    if (localStorage) {
      localStorage.removeItem("token");
    }
    setToken(null);
    setStatus("unautenticated");
  };
  return (
    <>
      <nav className="flex h-max justify-between relative z-[1] items-center ">
        <Link
          href={token ? "/profile" : "/login"}
          className="w-24 h-16 flex justify-center items-center cursor-pointer border-2 border-accent">
          {token ? "Profile" : "Login"}
        </Link>
        <Link
          className="w-full pt-2 h-16 flex items-center justify-center border-t-2 border-b-2 border-accent"
          href="/">
          ADMIN DASHBOARD
        </Link>
        {token && (
          <button
            onClick={() => handleLogout()}
            className="overflow-hidden nav-btn relative flex w-24 h-16 justify-center items-center border-2 border-accent cursor-pointer">
            <span>Signout</span>
          </button>
        )}
      </nav>
    </>
  );
}
