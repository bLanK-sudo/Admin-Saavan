"use client";

import { Abril_Fatface } from "next/font/google";
import { useAuth } from "@/context/AuthContext";

const abril = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });

export default function Register() {
  const { status } = useAuth();
  const userData = [
    {
      name: "In Game ID",
      placeholder: "Example ungaaya#soru",
      type: "text",
      options: [],
    },
    {
      name: "Have u played this before",
      type: "checkbox",
      options: ["Yes", "No"],
    },
  ];

  const teamData = {
    members: 3,
    fields: [{ name: "Team Name", type: "text" }],
  };
  const length = new Array(teamData.members).fill(0);
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
  return (
    <>
      <main className="w-full flex flex-col gap-2">
        <div className="text-2xl p-4 text-center">Event Registration</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 m-4">
          <div className="border-2 border-b-0 lg:border-b-2 lg:border-r-0 p-4 border-secondary font-bold">
            User Details
          </div>
          <div className=" flex flex-col w-full border-2 border-secondary bg-oppaccent">
            <div className="m-1 border-2 border-secondary">
              <div className=" flex border-b-2 items-center border-secondary">
                <input
                  id="name"
                  type="text"
                  className="outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Full Name"
                />
              </div>
              <div className="flex items-center border-secondary">
                <label
                  className="min-w-[35%] bg-primary text-primary-content border-r-2 border-b-2 border-secondary p-4"
                  htmlFor="name">
                  Email
                </label>
                <input
                  id="name"
                  type="email"
                  className="border-secondary border-b-2 outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Student Email"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 m-4">
          <div className="border-2 border-b-0 lg:border-b-2 lg:border-r-0 p-4 border-secondary font-bold">
            Team Details
          </div>
          <div className="flex flex-col w-full border-2 border-secondary bg-oppaccent">
            {length.map((_, index) => {
              return (
                <div key={index} className="m-1 border-2 border-secondary">
                  <div className="flex border-b-2 items-center border-secondary">
                    <h1 className="border-secondary outline-none p-4 bg-primary text-primary-content w-full font-bold">
                      Team Member {index + 1}
                    </h1>
                  </div>
                  <div className="flex border-b-2 items-center border-secondary">
                    <input
                      id="name"
                      type="text"
                      className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="flex items-center border-b-2 border-secondary">
                    <label
                      className="min-w-[35%] border-r-2 border-secondary p-4 bg-primary text-primary-content"
                      htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="text"
                      className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                      placeholder="Student Email"
                    />
                  </div>
                  {teamData.fields.map((field, ind) => {
                    return (
                      <div
                        key={ind}
                        className="flex items-center border-secondary">
                        <label
                          className="min-w-[35%] border-r-2 border-secondary p-4 bg-primary text-primary-content"
                          htmlFor={field.name}>
                          {field.name}
                        </label>
                        <input
                          id={field.name}
                          type="text"
                          className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                          placeholder=""
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div> */}
      </main>
    </>
  );
}
