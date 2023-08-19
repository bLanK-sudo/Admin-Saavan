"use client";
import { createContext, useState, useEffect, useContext } from "react";

export const EventContext = createContext();

export const useEvent = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within a EventProvider");
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!event) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("event")) {
          const parsed = JSON.parse(localStorage.getItem("event"));
          setEvent(parsed);
        }
      }
    }
  });
  const value = { event, setEvent };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export default EventProvider;
