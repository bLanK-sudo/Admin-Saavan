"use client";
import { useAuth } from "@/context/AuthContext";
import { use, useEffect } from "react";

export default function Profile() {
  const { status, token } = useAuth();
  const getTableData = async () => {
    const response = await fetch(
      process.env.PUBLIC_URL + "organizers/event/all_participants/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getTableData();
  }, [token]);
  const custom_data = [
    [
      {
        name: "custom",
        username: "Manish",
        email: "21f3002911",
        type: "text",
        placeholder: "custom",
        userValue: "custom",
      },
    ],
    [
      {
        name: "custom",
        username: "That guy",
        email: "21f3002911",
        type: "text",
        placeholder: "custom",
        userValue: "custom",
      },
    ],
    [
      {
        name: "custom",
        username: "This guy",
        email: "21f3002911",
        type: "text",
        placeholder: "custom",
        userValue: "custom",
      },
    ],
  ];

  const data = [
    {
      team: {
        name: "first",
      },
      custom_data: custom_data,
    },
  ];

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
  } else
    return (
      <>
        <main className="p-4 md:p-16 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">User Details</h1>
              <div className="flex gap-2">
                <div className="w-32 aspect-square bg-accent" />
                <div className="flex flex-col ">
                  <h2 className="font-bold text-xl">Manish S</h2>
                  <p>Super Admin</p>
                  <p>paradox@ds.study.iitm.ac.in</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Event Details</h1>
              <div className="flex gap-2">
                <div className="w-32 aspect-square bg-accent" />
                <div className="flex flex-col ">
                  <h2 className="font-bold text-xl">Event Name</h2>
                  <p>Manish S</p>
                  <p>21f3002911@ds.study.iitm.ac.in</p>
                </div>
              </div>
            </div>
          </div>

          <table className="overflow-x-scroll">
            <thead>
              <tr>
                <td>S.no</td>
                <td>Team Name</td>
                <td>Name</td>
                <td>Email</td>
              </tr>
            </thead>
            {data.map((team, index) => {
              return (
                <tbody key={index}>
                  {team.custom_data.map((member, i) => {
                    return member.map((custom, j) => {
                      return (
                        <tr key={j}>
                          <td> {i + 1} </td>
                          <td> {team.team.name} </td>
                          <td> {custom.username} </td>
                          <td> {custom.email} </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              );
            })}
          </table>
        </main>
      </>
    );
}
