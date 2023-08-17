"use client";

import { useRef, useState } from "react";
import TeamDetailsDiv from "./TeamDetailsDiv";
import TeamModal from "./TeamModal";

export default function Team() {
  const [fields, setFields] = useState([]);
  const [teamDetails, setTeamDetails] = useState([{ fields: [] }]);
  const [teamModal, setTeamModal] = useState(false);
  return (
    <>
      <div className="m-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 border-2 lg:border-r-0 border-secondary">
            <div className="p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-secondary font-bold">
              Total Number of team members
            </div>
            <input
              type="number"
              min={1}
              placeholder="Enter a value"
              onChange={(el) => {
                if (el.target.value < 1) return;
                if (el.target.value > 10) {
                  el.target.value = 10;
                }
                let arr = [];
                for (let i = 0; i < el.target.value; i++) {
                  if (fields) {
                    arr.push({
                      id: i,
                      fields: fields,
                    });
                  } else {
                    arr.push({
                      fields: [],
                    });
                  }
                }
                setTeamDetails(arr);
              }}
              className="bg-primary text-center text-2xl md:text-3xl lg:text-4xl p-4 text-primary-content outline-none w-full h-full"
            />
          </div>
          <div
            onClick={() => setTeamModal(!teamModal)}
            className="mt-2 hover:bg-green-800 transition-all duration-300 hover:text-accent-content lg:mt-0 h-full border-2 border-secondary cursor-pointer flex justify-center items-center font-bold">
            <h1 className="z-[0] p-2 relative">Add a field in team details</h1>
          </div>
        </div>
      </div>
      <div className="m-4">
        <div className="flex  flex-col border-2 border-secondary">
          <div className=" p-4 font-bold border-b-2 border-secondary">
            Team Details
          </div>
          <div className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-2 ">
            {teamDetails.map((details, index) => {
              return (
                <>
                  <TeamDetailsDiv
                    key={index}
                    index={index}
                    fields={fields}
                    setFields={setFields}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
      {teamModal && (
        <TeamModal
          setTeamModal={setTeamModal}
          fields={fields}
          setFields={setFields}
        />
      )}
      <div
        onClick={() => {
          console.log(teamDetails);
          console.log(fields);
        }}
        className="hover:bg-green-800 transition-all duration-300 hover:text-accent-content border-2 border-secondary cursor-pointer font-bold text-xl m-4 flex justify-center items-center p-4">
        <span className="z-[0]">Save Template</span>
      </div>
    </>
  );
}
