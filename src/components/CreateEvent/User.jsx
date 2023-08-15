"use client";

import { useState } from "react";
import UserDetails from "./UserDetailsDiv";
import { motion } from "framer-motion";
import UserOptionsModal from "./UserOptionsModal";
import UserModal from "./UserModal";
export default function User() {
  const [userDetails, setUserDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [userOptionsModal, setUserOptionsModal] = useState(false);
  const handleSave = () => {
    console.log(userDetails);
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 border-2 border-secondary m-4">
        <div className=" border-b-2 border-r-0 lg:border-r-2 lg:border-b-0  border-secondary p-4  font-bold">
          User Details
        </div>
        <div className=" flex flex-col w-full ">
          <motion.div layout className="m-1 flex gap-2 flex-col">
            <div className=" flex flex-col border-2 items-center border-secondary">
              <input
                id="name"
                type="text"
                disabled
                className="outline-none p-4 bg-primary text-primary-content w-full border-b-2 border-secondary"
                placeholder="Full Name"
              />
              <input
                id="name"
                type="number"
                disabled
                className="outline-none p-4 bg-primary text-primary-content w-full border-b-2 border-secondary"
                placeholder="Phone"
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
                <>
                  <UserDetails
                    key={index}
                    detail={detail}
                    index={index}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                </>
              );
            })}
          </motion.div>
          <div
            onClick={() => {
              setModal(true);
            }}
            className="m-1 flex hover:text-accent-content justify-center items-center border-2 border-secondary h-12 nav-btn cursor-pointer">
            <h1 className="z-[0] font-bold">Add a field</h1>
          </div>
          <div
            onClick={() => {
              setUserOptionsModal(true);
            }}
            className="m-1 flex hover:text-accent-content justify-center items-center border-2 border-secondary h-12 nav-btn cursor-pointer">
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
          console.log(userDetails);
        }}
        className="nav-btn hover:text-accent-content border-2 border-secondary cursor-pointer font-bold text-xl m-4 flex justify-center items-center p-4">
        <span className="z-[0]">Save Template</span>
      </div>
    </>
  );
}
