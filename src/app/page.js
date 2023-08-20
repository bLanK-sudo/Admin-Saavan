"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Link from "next/link";
export default function Home() {
  const { token, status } = useAuth();
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);
  useEffect(() => {
    let cred;
    if (token && status === "authenticated") {
      cred = jwt_decode(token.credentials);
      setUser(cred);
    }
  }, [token]);
  useEffect(() => {
    if (typeof window !== "undefined" && !event) {
      setEvent(JSON.parse(localStorage.getItem("event")));
    }
  });

  if (status === "loading") {
    return (
      <>
        <main className="fixed w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-32 h-32 bg-white rounded-full" />
        </main>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <div className="flex flex-col gap-2 justify-center items-center min-h-[70vh]">
          <h1 className="text-4xl font-bold">Unauthenticated</h1>
          <p>You are not logged in</p>
        </div>
      </>
    );
  }
  if (user) {
    return (
      <main className="flex flex-col h-full justify-center p-24 min-h-[70vh] gap-16">
        <div className="flex gap-2 justify-center items-center">
          <div className="min-w-[4rem]">
            <Image
              src={user.picture}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="flex-col flex">
            <h1 className="text-xl md:text-4xl font-bold">Authenticated</h1>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <>
            <Link
              href="/event/create"
              className="p-2 px-4 rounded-xl border-2 border-accent hover:bg-accent hover:text-accent-content transition-all duration-300 font-bold">
              Create event page
            </Link>
            <Link
              aria-disabled
              href="/register/compose"
              className="p-2 px-4 rounded-xl border-2 border-accent hover:bg-accent hover:text-accent-content transition-all duration-300 font-bold">
              Create Registration Page
            </Link>
          </>
        </div>
      </main>
    );
  }
}
