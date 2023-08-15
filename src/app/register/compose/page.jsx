"use client";

import { useState } from "react";
import User from "@/components/CreateEvent/User";
import Team from "@/components/CreateEvent/Team";
import { motion, AnimatePresence } from "framer-motion";

export default function Compose() {
  const [checkedUser, setCheckedUser] = useState(false);
  const [checkedTeam, setCheckedTeam] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <main className="w-full md:w-[70%] flex flex-col gap-2">
        <div className="text-2xl p-4 text-center">Create Registration Page</div>
        <p className="text-center">
          Select a given template and add extra fields.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-2 m-4">
          <div className="w-full">
            <input
              className="z-[0] font-bold hidden cursor-pointer"
              type="checkbox"
              name="user"
              id="user"
            />
            <label
              animate={{ scale: [1, 1.1, 1] }}
              onClick={(el) => {
                if (checkedTeam) {
                  setCheckedTeam(!checkedTeam);
                  setCheckedUser(!checkedUser);
                } else {
                  setCheckedUser(!checkedUser);
                }
              }}
              htmlFor="user"
              className={`${
                checkedUser ? "bg-green-800 text-white" : ""
              } mb-1 flex font-bold justify-center items-center border-2 border-secondary h-12 cursor-pointer`}>
              <span className="z-[0] px-4">
                {checkedUser ? "Selected" : "Select"} User Template
              </span>
            </label>
          </div>
          <div className="m-4 w-full">
            <input
              className="z-[0] font-bold hidden cursor-pointer"
              type="checkbox"
              name="user"
              id="user"
            />
            <label
              animate={{ scale: [1, 1.1, 1] }}
              onClick={(el) => {
                if (checkedUser) {
                  setCheckedUser(!checkedUser);
                  setCheckedTeam(!checkedTeam);
                } else {
                  setCheckedTeam(!checkedTeam);
                }
              }}
              htmlFor="user"
              className={`${
                checkedTeam ? "bg-green-800 text-white" : ""
              } mb-1 flex font-bold justify-center items-center border-2 border-secondary h-12 cursor-pointer`}>
              <span className="z-[0]">
                {checkedTeam ? "Selected" : "Select"} Team Template
              </span>
            </label>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {checkedUser && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: [0, 1], scale: [0.98, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                <User />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {checkedTeam && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: [0, 1], scale: [0.98, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Team />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
