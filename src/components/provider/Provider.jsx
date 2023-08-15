"use client";
import AuthProvider from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function Provider({ children }) {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
