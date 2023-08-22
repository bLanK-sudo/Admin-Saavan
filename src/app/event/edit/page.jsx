"use client";

import { AdminEventPage } from "@/components/CreateEvent/EventPage"
import axios from "@/components/axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const AdminEditEventPage = () => {
  const { token, status } = useAuth();
  const [data, setData] = useState({})

  useEffect(
    () => axios.get('organizers/event/', {headers: {Authorization: `Bearer ${token.access_token}`}})
    .then((res) => console.log(res))
    .catch((err) => {
      if (err.response) console.log(err.response)
    }), 
    []
  )
  return (
    <AdminEventPage auth={{token, status}} {...data} editEvent={true} />
  )
}

export default AdminEditEventPage