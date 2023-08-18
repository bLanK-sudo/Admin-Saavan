"use client";

import { Abril_Fatface } from "next/font/google";
import { useAuth } from "@/context/AuthContext";

const abril = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });

export default function Register() {
  const { status } = useAuth();
  const data = [
    { name: "In Game ID", type: "text", options: [] },
    {
      name: "Have u played this before",
      type: "checkbox",
      options: ["Yes", "No"],
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
              {data.map((detail, index) => {
                console.log(index);
                if (detail.type == "textarea") {
                  return (
                    <div
                      key={index}
                      id={index + "textarea"}
                      className="flex flex-col w-full justify-start items-center">
                      <label
                        className="w-full flex justify-between bg-primary text-primary-content border-2 border-secondary"
                        htmlFor="name">
                        <span className="p-4">{detail.name}</span>
                      </label>
                      <textarea
                        className="outline-none p-4 bg-primary text-primary-content w-full border-b-2 border-secondary "
                        name=""
                        id=""
                        cols="30"
                        rows="10"></textarea>
                    </div>
                  );
                } else if (
                  detail.type == "checkbox" ||
                  detail.type == "radio"
                ) {
                  return (
                    <div
                      key={index}
                      id={index + "checkbox"}
                      className="flex flex-col w-full justify-start items-center">
                      <div className="w-full flex h-full justify-between bg-primary text-primary-content border-b-2 border-secondary">
                        <span className="p-4">{detail.name}</span>
                      </div>
                      <div className="flex flex-col justify-center w-full items-start p-4 border-b-2 border-secondary gap-4">
                        {detail.options.map((option, ind) => {
                          return (
                            <div
                              key={ind + 3}
                              id={ind + "options"}
                              className="flex gap-2 text-xl">
                              <input
                                name={detail.name}
                                className=" cursor-pointer"
                                id={ind + "" + index}
                                type={detail.type}
                              />
                              <label
                                className=" cursor-pointer"
                                htmlFor={ind + "" + index}>
                                {option}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index + 1}
                      id={index + "input"}
                      className="flex w-full items-center border-b-2 border-secondary">
                      <label
                        className="min-w-[35%] bg-primary text-primary-content p-4 border-r-2 border-secondary"
                        htmlFor={index}>
                        {detail.name}
                      </label>
                      <input
                        id="name"
                        type={detail.type}
                        className="outline-none p-4 bg-primary text-primary-content w-full"
                        placeholder={detail.name}
                      />
                    </div>
                  );
                }
              })}
              <div className="flex items-center border-secondary">
                <label
                  className="min-w-[35%] bg-primary text-primary-content border-r-2 border-secondary p-4"
                  htmlFor="name">
                  Phone
                </label>
                <input
                  id="name"
                  type="text"
                  className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Phone Number"
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
            <div className="m-1 border-2 border-secondary">
              <div className="flex border-b-2 items-center border-secondary">
                <h1 className="border-secondary outline-none p-4 bg-primary text-primary-content w-full font-bold">
                  Team Member 1
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
              <div className="flex items-center border-secondary">
                <label
                  className="min-w-[35%] border-r-2 border-secondary p-4 bg-primary text-primary-content"
                  htmlFor="name">
                  ID
                </label>
                <input
                  id="name"
                  type="text"
                  className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Student ID"
                />
              </div>
            </div>

            <div className="m-1 border-2 border-secondary">
              <div className="flex border-b-2 items-center border-secondary">
                <h1 className="border-secondary outline-none p-4 bg-primary text-primary-content w-full font-bold">
                  Team Member 1
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
              <div className="flex items-center border-secondary">
                <label
                  className="min-w-[35%] border-r-2 border-secondary p-4 bg-primary text-primary-content"
                  htmlFor="name">
                  ID
                </label>
                <input
                  id="name"
                  type="text"
                  className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Student ID"
                />
              </div>
            </div>

            <div className="m-1 border-2 border-secondary">
              <div className="flex border-b-2 items-center border-secondary">
                <h1 className="border-secondary outline-none p-4 bg-primary text-primary-content w-full font-bold">
                  Team Member 1
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
              <div className="flex items-center border-secondary">
                <label
                  className="min-w-[35%] border-r-2 border-secondary p-4 bg-primary text-primary-content"
                  htmlFor="name">
                  ID
                </label>
                <input
                  id="name"
                  type="text"
                  className="border-secondary outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Student ID"
                />
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
}
