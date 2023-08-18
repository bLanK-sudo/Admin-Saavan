"use client";

import { useEffect, useRef, useState } from "react";
import TeamDetailsDiv from "./TeamDetailsDiv";
import TeamModal from "./TeamModal";

export default function Team() {
  const [fields, setFields] = useState([]);
  const [teamDetails, setTeamDetails] = useState({ members: 1, fields: [] });
  const [teamModal, setTeamModal] = useState(false);
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
          console.log(teamDetails);
        }}
        className="hover:bg-accent transition-all duration-300 hover:text-accent-content border-2 border-secondary cursor-pointer font-bold text-xl m-4 flex justify-center items-center p-4">
        <span className="z-[0]">Save Template</span>
      </div>
    </>
  );
}
