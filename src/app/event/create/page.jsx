"use client";

import { AdminEventPage } from "@/components/CreateEvent/EventPage"
import { useAuth } from "@/context/AuthContext";

const AdminCreateEventPage = () => {
  const { token, status } = useAuth();
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
  
  return (
    <AdminEventPage auth={{token, status}} />
  )
}

export default AdminCreateEventPage