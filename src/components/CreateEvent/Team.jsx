"use client";

import { useEffect, useRef, useState } from "react";
import TeamDetailsDiv from "./TeamDetailsDiv";
import { AnimatePresence, motion } from "framer-motion";
import TeamModal from "./TeamModal";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
export default function Team() {
  const [fields, setFields] = useState([]);
  const [teamDetails, setTeamDetails] = useState({ members: 1, fields: [] });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [teamModal, setTeamModal] = useState(false);
  const { token } = useAuth();
  const { event, setEvent } = useEvent();

  useEffect(() => {
    if (event) {
      if (event.is_team_event) {
        if (event.template) {
          setTeamDetails(JSON.parse(event.template));
        }
      }
    }
  }, [event]);

  const handleSave = async () => {
    setLoading(true);
    if (event && token) {
      try {
        console.log("sending fetch");
        const response = await fetch(
          "https://saavan23dev.onrender.com/events/set-template/" +
            event.id +
            "/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access_token,
            },
            body: JSON.stringify({
              template: teamDetails,
            }),
          }
        );

        const data = await response.json();
        if (response.status === 200) {
          event.template = teamDetails;
          setEvent(event);
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
    }
  };
  useEffect(() => {
    teamDetails.fields = fields;
    setTeamDetails(teamDetails);
  }, [fields]);
  return (
    <>
      <div className="m-4">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 border-2 border-secondary">
            <div className="p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-secondary font-bold">
              Total Number of team members
            </div>
            <input
              type="number"
              min={1}
              placeholder="Enter a value"
              onInput={(el) => {
                if (el.target.value < 1) return;
                if (el.target.value > 10) {
                  el.target.value = 10;
                }
                teamDetails.members = el.target.value;
                setTeamDetails(teamDetails);
              }}
              className="bg-primary text-center text-2xl md:text-3xl lg:text-4xl p-4 text-primary-content outline-none w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="m-4">
        <div className="flex  flex-col border-2 border-secondary">
          <div className=" p-4 font-bold border-b-2 border-secondary">
            Team Details
          </div>
          <div className="m-4 gap-2 ">
            <TeamDetailsDiv fields={fields} setFields={setFields} />
            <div
              onClick={() => setTeamModal(!teamModal)}
              className="hover:bg-accent transition-all duration-300 hover:text-accent-content m-1 lg:mt-0 h-full border-2 border-secondary cursor-pointer flex justify-center items-center font-bold">
              <h1 className="z-[0] p-2 relative">
                Add a field in team details
              </h1>
            </div>
          </div>
        </div>
      </div>
      {teamModal && (
        <TeamModal
          setTeamModal={setTeamModal}
          fields={fields}
          setFields={setFields}
          setTeamDetails={setTeamDetails}
        />
      )}
      <div
        onClick={() => {
          handleSave();
        }}
        className="hover:bg-accent transition-all duration-300 hover:text-accent-content border-2 border-secondary cursor-pointer font-bold text-xl m-4 flex justify-center items-center p-4">
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
                  Template Saved!
                </h1>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
