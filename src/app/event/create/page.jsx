"use client";

import { AdminEventPage } from "@/components/CreateEvent/EventPage";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const AdminCreateEventPage = () => {
  const { token, status } = useAuth();
  const [flag, setFlag] = useState(true);
  if (status === "loading") {
    return <Loader />;
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

  if (flag) {
    return <AdminEventPage auth={{ token, status }} />;
  }
};

export default AdminCreateEventPage;
