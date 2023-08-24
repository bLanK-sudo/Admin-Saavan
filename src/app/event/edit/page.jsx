"use client";

import { AdminEventPage } from "@/components/CreateEvent/EventPage"
import axios from "@/components/axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const AdminEditEventPage = () => {
  const { token, status } = useAuth()
  const [data, setData] = useState(null)

    useEffect(() => {
      axios.get('organizers/event/', {headers: {Authorization: `Bearer ${token?.access_token}`}})
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response) console.log(err.response)
      })
      },
      [token, status]
    )

    if (data) {
      // console.log(data)
      return (
        <AdminEventPage auth={{token, status}} {...data} editEvent={true} />
      )
    } else {
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
    }
}

export default AdminEditEventPage