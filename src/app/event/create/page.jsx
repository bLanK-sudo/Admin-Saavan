"use client";

import { AdminEventPage } from "@/components/CreateEvent/EventPage"
import { useAuth } from "@/context/AuthContext";

const AdminCreateEventPage = () => {
  const { token, status } = useAuth();
  return (
    <AdminEventPage auth={{token, status}} />
  )
}

export default AdminCreateEventPage