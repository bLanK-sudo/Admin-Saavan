"use client";

import { useEffect, useState } from "react";
import UserDetails from "./UserDetailsDiv";
import { AnimatePresence, motion } from "framer-motion";
import UserOptionsModal from "./UserOptionsModal";
import { useAuth } from "@/context/AuthContext";
import UserModal from "./UserModal";
export default function User() {
  const [userDetails, setUserDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userOptionsModal, setUserOptionsModal] = useState(false);
  const { token } = useAuth();
  const handleSave = async () => {
    console.log(userDetails);
    setLoading(true);
    try {
      console.log("sending fetch");
      const response = await fetch(
        "https://saavan23dev.onrender.com/events/set-template/4/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.access_token,
          },
          body: JSON.stringify({
            template: userDetails,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 4500);
      }
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 border-2 border-secondary m-4">
        <div className=" border-b-2 border-r-0 lg:border-r-2 lg:border-b-0  border-secondary p-4  font-bold">
          User Details
        </div>
        <div className=" flex flex-col w-full ">
          <div className="m-1 flex gap-2 flex-col">
            <div className=" flex flex-col border-2 items-center border-secondary">
              <input
                id="name"
                type="text"
                disabled
                className="outline-none p-4 bg-primary text-primary-content w-full border-b-2 border-secondary"
                placeholder="Full Name"
              />
              <div className="flex w-full items-center">
                <label
                  className="min-w-[35%] bg-primary text-primary-content p-4 border-r-2 border-secondary"
                  htmlFor="email">
                  Email
                </label>
                <input
                  id="name"
                  type="email"
                  disabled
                  className="outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Email"
                />
              </div>
            </div>
            {userDetails.map((detail, index) => {
              return (
                <UserDetails
                  key={index}
                  detail={detail}
                  index={index}
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              );
            })}
          </div>
          <div
            onClick={() => {
              setModal(true);
            }}
            className="m-1 flex hover:bg-green-800 transition-all duration-300 hover:text-accent-content  justify-center items-center border-2 border-secondary h-12 cursor-pointer">
            <h1 className="z-[0] font-bold">Add a field</h1>
          </div>
          <div
            onClick={() => {
              setUserOptionsModal(true);
            }}
            className="m-1 hover:bg-green-800 transition-all duration-300 hover:text-accent-content flex justify-center items-center border-2 border-secondary h-12 cursor-pointer">
            <h1 className="z-[0] font-bold">Add a poll/options</h1>
          </div>
        </div>
      </div>
      {modal && (
        <UserModal
          userDetails={userDetails}
          setModal={setModal}
          setUserDetails={setUserDetails}
        />
      )}
      {userOptionsModal && (
        <UserOptionsModal
          setModal={setModal}
          setUserOptionsModal={setUserOptionsModal}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
      <div
        onClick={() => {
          handleSave();
        }}
        className="hover:bg-accent transition-all hover:text-accent-content duration-300 border-2 border-secondary cursor-pointer font-bold text-xl m-4 flex justify-center items-center p-4">
        <span className="z-[0]">Save Template</span>
      </div>
      <AnimatePresence mode="wait">
        {loading && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: [0, 1], scale: [0.98, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}>
              <div className="w-screen fixed h-screen bg-black bg-opacity-40 inset-0 flex justify-center items-center">
                <h1 className="p-4 bg-secondary text-secondary-content rounded-xl w-[80%] md:w-1/2 text-center h-[20%] md:h-1/3 flex justify-center items-center">
                  We are creating the registration page for you...
                </h1>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {success && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: [0, 1], scale: [0.98, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}>
              <div className="w-screen fixed h-screen bg-black bg-opacity-40 inset-0 flex justify-center items-center">
                <h1 className="p-4 bg-secondary text-secondary-content rounded-xl w-[80%] md:w-1/2 text-center h-[20%] md:h-1/3 flex justify-center items-center">
                  Please wait a few secs while we log you in...
                </h1>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
