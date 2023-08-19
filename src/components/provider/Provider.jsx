"use client";
import AuthProvider from "@/context/AuthContext";
import EventProvider from "@/context/EventContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function Provider({ children }) {
  return (
    <EventProvider>
      <AuthProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </AuthProvider>
    </EventProvider>
  );
}
