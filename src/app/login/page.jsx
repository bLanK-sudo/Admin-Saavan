"use client";
import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useEvent } from "@context/EventContext";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import axios from "@components/axios";
import Loader from "@/components/Loader";
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
        onSuccess={(res) => {
          setLoading(true);

          const authPayload = {
            backend: "google-identity",
            token: res.credential,
            grant_type: "convert_token",
            client_id: process.env.DJANGO_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
          };

          axios
            .post("/auth/convert-token", { ...authPayload })
            .then((response) => {
              if (response.status === 200) {
                const data = response.data;

                const token = {
                  access_token: data.access_token,
                  credentials: res.credential,
                  time: new Date().getTime() + 10 * 1000 * 3600,
                };
                localStorage.setItem("token", JSON.stringify(token));
                setToken(token);
                setStatus("authenticated");

                router.push("/");
                axios
                  .get("/organizers/event/", {
                    headers: { Authorization: "Bearer " + token.access_token },
                  })
                  .then((event_res) => {
                    if (event_res.status === 200) {
                      const event_data = event_res.data;
                      localStorage.setItem("event", JSON.stringify(event_data));
                      setEvent(event_data);
                    }
                  })
                  .catch((err) => {
                    if (err.response) console.log(err);
                  });
              }
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response);
              }
              // console.log("Something went wrong");
            });
        }}
        onFailure={(res) => console.log(res)}
      />
      {loading && (
        <>
          <Loader />
        </>
      )}
    </main>
  );
}
