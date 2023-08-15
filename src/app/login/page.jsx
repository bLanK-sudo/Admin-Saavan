"use client";
import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
export default function Login() {
  const { setToken, setStatus } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-[70vh] w-full flex flex-col justify-center items-center">
      <GoogleLogin
        shape="circle"
        clientId={process.env.GOOGLE_CLIENT_ID}
        onSuccess={async (res) => {
          console.log(res);
          setLoading(true);
          try {
            // axios.post("http://localhost:8000/auth/convert-token/", {})
            const response = await fetch(
              "https://saavan23dev.onrender.com/auth/convert-token/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  backend: "google-identity",
                  token: res.credential,
                  grant_type: "convert_token",
                  client_id: "kM3nGTr00GxIWPFxs8cqpOe9md7jYdAf76D047fF",
                  client_secret:
                    "Ui4d0m2ejOLTNhl3oYXq1VdTxlrqAvipuaV8AH4yJsvWHhcR1MjtjXwgd5xRy5KWyg9Hh3rZt6hYMfqrqE4H4B5EXIIYuuZy5C4fKl8fWASMb6eevPqQXVxkZcrg7VlN",
                }),
              }
            );
            const data = await response.json();
            if (response.status === 200) {
              console.log(data);
              const token = {
                access_token: data.access_token,
                credentials: res.credential,
              };
              setToken(JSON.stringify(token));
              setStatus("authenticated");

              if (data) {
                localStorage.setItem("token", JSON.stringify(token));
              }
              router.push("/");
              //setLoading(false);
            } else if (response.status === 401) {
              router.push("/unauthorized");
              //setLoading(false);
            }
          } catch (err) {
            // setLoading(false);
            console.log("err");
            console.log(err);
          }
        }}
        onFailure={(res) => console.log(res)}></GoogleLogin>
      {loading && (
        <>
          <div className="w-screen fixed h-screen bg-black bg-opacity-40 inset-0 flex justify-center items-center">
            <h1 className="p-4 bg-secondary text-secondary-content rounded-xl w-[80%] md:w-1/2 text-center h-[20%] md:h-1/3 flex justify-center items-center">
              Please wait a few secs while we log you in...
            </h1>
          </div>
        </>
      )}
    </main>
  );
}
