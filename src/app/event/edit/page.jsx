"use client";

import { AdminEventPage } from "@/components/CreateEvent/EventPage";
import Loader from "@/components/Loader";
import axios from "@/components/axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const AdminEditEventPage = () => {
  const { token, status } = useAuth();
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    token &&
      axios
        .get("organizers/event/", {
          headers: { Authorization: `Bearer ${token?.access_token}` },
        })
        .then((res) => setData(res.data))
        .catch((err) => {
          if (err.response) console.log(err.response);
        });
  }, [token]);

  if (data && flag) {
    return (
      <AdminEventPage auth={{ token, status }} {...data} editEvent={true} />
    );
  } else {
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

    return <Loader />;
  }
};

export default AdminEditEventPage;
