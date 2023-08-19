"use client";
import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEvent } from "@/context/EventContext";
export default function Login() {
  const { setToken, setStatus } = useAuth();
  const { event, setEvent } = useEvent();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-[70vh] w-full flex flex-col justify-center items-center">
      <GoogleLogin
        theme="filled_black"
        shape="circle"
        clientId={process.env.GOOGLE_CLIENT_ID}
        redirectUri={process.env.GOOGLE_REDIRECT_URI}
        onSuccess={async (res) => {
          console.log(res);
          setLoading(true);
          try {
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
                  client_id: process.env.DJANGO_CLIENT_ID,
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
                time: new Date().getTime() + 10 * 1000 * 3600,
              };
              try {
                const event = await fetch(
                  "https://saavan23dev.onrender.com/organizers/event/",
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token.access_token,
                    },
                  }
                );
                const event_data = await event.json();
                if (event.status === 200) {
                  console.log(event_data.name);
                  console.log(event_data.id);
                  localStorage.setItem("event", JSON.stringify(event_data));
                  setEvent(event_data);
                }
              } catch (err) {
                console.log(err);
              }

              if (data) {
                localStorage.setItem("token", JSON.stringify(token));
                setToken(JSON.stringify(token));
                setStatus("authenticated");
              }
              router.push("/");
              //setLoading(false);
            } else if (response.status === 401) {
              router.push("/unauthorized");
              //setLoading(false);
            }
          } catch (err) {
            // setLoading(false);
            console.log(err);
            setToast("Something went wrong");
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
