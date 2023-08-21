"use client";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { status } = useAuth();

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
  } else
    return (
      <>
        <main className="p-4 md:p-16 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">User Details</h1>
              <div className="flex gap-2">
                <div className="w-32 aspect-square bg-accent" />
                <div className="flex flex-col ">
                  <h2 className="font-bold text-xl">Manish S</h2>
                  <p>Super Admin</p>
                  <p>paradox@ds.study.iitm.ac.in</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Event Details</h1>
              <div className="flex gap-2">
                <div className="w-32 aspect-square bg-accent" />
                <div className="flex flex-col ">
                  <h2 className="font-bold text-xl">Event Name</h2>
                  <p>Manish S</p>
                  <p>21f3002911@ds.study.iitm.ac.in</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
}
