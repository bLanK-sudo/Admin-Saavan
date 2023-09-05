"use client";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";

export default function Profile() {
  const { status, token } = useAuth();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [soloData, setSoloData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [coreData, setCoreData] = useState(null);
  const [soloTeamName, setSoloTeamName] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const { event } = useEvent();
  const table = useRef(null);

  const getCoreData = async () => {
    if (token) {
      const response = await fetch(
        process.env.PUBLIC_URL + "organizers/core/all_participants/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
      if (response.status === 200) setCoreData(res);
    }
  };

  const getTd = (dt) => {
    let correct = [];
    dt.options.map((option) => {
      if (dt.userOptions[option] == true) {
        correct.push(option);
      }
    });
    return correct;
  };

  useEffect(() => {
    let cred;
    if (token && status === "authenticated") {
      cred = jwt_decode(token.credentials);
      if (cores.includes(cred.email)) {
        setUser(cred);
        getCoreData();
      } else {
        setUser(null);
      }
    }
  }, [token]);
  const getTableData = async () => {
    if (token) {
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
      const res = await response.json();
      console.log(res);
      if (response.status === 200) setData(res);
    }
  };

  const cores = [
    "culturals@iitmparadox.org",
    "technicals@iitmparadox.org",
    "sports@iitmparadox.org",
  ];

  class csvExportFromTable {
    constructor(table, header = true) {
      this.table = table;
      this.rows = Array.from(table.querySelectorAll("tr"));
      if (!header && this.rows[0].querySelectorAll("th").length) {
        this.rows.shift();
      }
    }

    exportCsvFromTable() {
      const lines = [];
      const ncols = this._longest();
      for (const row of this.rows) {
        let line = "";
        for (let i = 0; i < ncols; i++) {
          if (row.children[i] !== undefined) {
            line += csvExportFromTable.safeData(row.children[i]);
          }
          line += i !== ncols - 1 ? "," : "";
        }
        lines.push(line);
      }
      //console.log(lines);
      return lines.join("\n");
    }
    _longest() {
      return this.rows.reduce(
        (length, row) =>
          row.childElementCount > length ? row.childElementCount : length,
        0
      );
    }
    static safeData(td) {
      let data = td.textContent;
      //Replace all double quote to two double quotes
      data = data.replace(/"/g, `""`);
      //Replace , and \n to double quotes
      data = /[",\n"]/.test(data) ? `"${data}"` : data;
      return data;
    }
  }
  const CSVDownload = () => {
    if (data.length === 0) {
      alert("No data to download");
      return;
    }
    const tableData = new csvExportFromTable(table.current);
    const csvData = tableData.exportCsvFromTable();
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(csvBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.csv";
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 500);
  };
  const CSVEventCoreDownload = (id, data, name) => {
    if (data.length === 0) {
      alert("No data to download");
      return;
    }
    const tableData = new csvExportFromTable(
      document.querySelector("#table" + id)
    );
    const csvData = tableData.exportCsvFromTable();
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(csvBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name + ".csv";
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 500);
  };
  useEffect(() => {
    getTableData();
  }, [token]);

  useEffect(() => {
    console.log(event);
  }, [event]);

  useEffect(() => {
    if (coreData) {
      let customTeamData = {};
      coreData.team_applications.map((application, index) => {
        customTeamData.hasOwnProperty(application.event.name)
          ? customTeamData[application.event.name].push(application)
          : (customTeamData[application.event.name] = [application]);
      });
      let customSoloData = {};
      coreData.solo_applications.map((application, index) => {
        customSoloData.hasOwnProperty(application.event.name)
          ? customSoloData[application.event.name].push(application)
          : (customSoloData[application.event.name] = [application]);
      });
      setTeamData(customTeamData);
      setSoloData(customSoloData);
    }
    console.log("solo, team", soloData, teamData);
  }, [coreData]);

  useEffect(() => {
    console.log("teamName", teamName);
  }, []);

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
  if (user) {
    return (
      <>
        {teamData &&
          Object.keys(teamData).map((team, index) => {
            return (
              <div key={index} className="p-4">
                <div className="flex justify-between items-center p-4">
                  <h1 className="font-bold text-2xl">
                    {teamData[team][0].event.name}
                  </h1>
                  <button
                    onClick={() =>
                      CSVEventCoreDownload(
                        index,
                        Object.keys(teamData),
                        teamData[team][0].event.name
                      )
                    }
                    className="p-4 rounded-xl bg-accent text-white">
                    Download Data
                  </button>
                </div>
                <div className="w-full overflow-x-scroll">
                  <table
                    id={"table" + index}
                    className="border-collapse border border-slate-500 table-fixed p-4">
                    <thead>
                      <tr className="even:bg-slate-600 even:text-white odd:bg-gray-300 ">
                        <td className="border border-black p-4">S.No</td>
                        <td className="border border-black p-4">Team Name</td>
                        <td className="border border-black p-4">Email</td>
                        <td className="border border-black p-4">Name</td>
                        {teamData[team].map((application, j) => {
                          return application.custom_data.map((dt, jk) => {
                            if (j == 0 && jk == 0) {
                              return dt.map((cd, k) => {
                                return (
                                  <td
                                    key={k}
                                    className="border border-black p-4 max-w-[200px] overflow-hidden">
                                    {cd.name}
                                  </td>
                                );
                              });
                            }
                          });
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {teamData[team].map((application, j) => {
                        return application.custom_data.map((dt, jk) => {
                          return (
                            application.team.members[jk] && (
                              <tr key={jk}>
                                <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                                  {j + 1}
                                </td>
                                <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                                  {" "}
                                  {application.team.name}{" "}
                                </td>
                                <td className="border border-black p-4 max-w-[300px] overflow-hidden">
                                  {" "}
                                  {application.team.members[jk].user.email}{" "}
                                </td>
                                <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                                  {" "}
                                  {application.team.members[jk].user
                                    .first_name +
                                    " " +
                                    application.team.members[jk].user
                                      .last_name}{" "}
                                </td>
                                {dt.map((cd, k) => {
                                  return (
                                    <td
                                      key={k}
                                      className="border border-black p-4 max-w-[200px] overflow-hidden">
                                      {cd.userValue}
                                    </td>
                                  );
                                })}
                              </tr>
                            )
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        {soloData &&
          Object.keys(soloData).map((event, index) => {
            console.log(soloData[event]);
            return (
              <div key={index} className="p-4">
                <div className="flex justify-between items-center p-4">
                  <h1 className="font-bold text-2xl">
                    {soloData[event][0].event.name}
                  </h1>
                  <button
                    onClick={() =>
                      CSVEventCoreDownload(
                        index + Object.keys(teamData).length,
                        Object.keys(soloData),
                        soloData[event][0].event.name
                      )
                    }
                    className="p-4 rounded-xl bg-accent text-white">
                    Download Data
                  </button>
                </div>
                <div className="w-full overflow-x-scroll">
                  <table
                    id={"table" + (index + Object.keys(teamData).length)}
                    className="border-collapse border border-slate-500 table-fixed">
                    <thead>
                      <tr className="even:bg-slate-600 even:text-white odd:bg-gray-300 ">
                        <td className="border border-black p-4 overflow-hidden">
                          S.No
                        </td>
                        <td className="border border-black p-4 overflow-hidden">
                          Email
                        </td>
                        <td className="border border-black p-4 overflow-hidden">
                          Name
                        </td>
                        {soloData[event].map((application, j) => {
                          return application.custom_data.map((dt, jk) => {
                            if (j == 0) {
                              return (
                                <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                                  {" "}
                                  {dt.name}{" "}
                                </td>
                              );
                            }
                          });
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {soloData[event].map((application, j) => {
                        return (
                          <tr>
                            <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                              {j + 1}
                            </td>
                            <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                              {application.student.user.email}
                            </td>
                            <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                              {application.student.user.first_name +
                                application.student.user.last_name}
                            </td>
                            {application.custom_data.map((dt, jk) => {
                              return dt.type == "checkbox" ||
                                dt.type == "radio" ? (
                                <td className="border border-black p-4 max-w-[200px] overflow-hidden">
                                  {getTd(dt)}
                                </td>
                              ) : (
                                <td
                                  key={jk}
                                  className="border border-black p-4 max-w-[200px] overflow-hidden">
                                  {dt.userValue}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </>
    );
  } else
    return (
      <>
        <main className="p-4 md:p-16 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <button
              onClick={() => CSVDownload()}
              className="p-4 rounded-xl bg-accent text-white">
              Download Data
            </button>
          </div>
          {event ? (
            <>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-2xl">Event Details</h1>
                  <div className="flex gap-2">
                    <div className="w-32 aspect-square bg-accent">
                      <img src={event.header_image} alt="" />
                    </div>
                    <div className="flex flex-col ">
                      <h2 className="font-bold text-xl">
                        {" "}
                        {event && event.name}{" "}
                      </h2>
                      <div className="pt-4">
                        <p className="font-semibold">Registration Count:</p>
                        <p className="font-bold">
                          {data
                            ? data.length > 0
                              ? data.length
                              : "No registration"
                            : "loading..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {event.is_team_event ? (
                <>
                  <table
                    ref={table}
                    className="border-collapse border border-slate-500 w-full overflow-x-scroll">
                    <thead>
                      <tr className="border border-black">
                        <th className="border border-black p-4">T.No</th>
                        <th>Team Name</th>
                        <th className="border border-black p-4">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((dt, index) => {
                          return dt.team.members.map((member, i) => {
                            return (
                              <tr
                                key={i}
                                className="even:bg-slate-600 even:text-white odd:bg-gray-300 ">
                                <td className="border border-black p-4">
                                  {index + 1}
                                </td>
                                <td className="border border-black p-4">
                                  {dt.team.name}
                                </td>
                                <td className="border border-black p-4">
                                  {member.user.email}
                                </td>
                              </tr>
                            );
                          });
                        })}
                    </tbody>
                  </table>
                </>
              ) : (
                <table
                  ref={table}
                  className="border-collapse border border-slate-500 max-w-[300px]">
                  <thead>
                    <tr className="border border-black">
                      <th className="border border-black p-4">S.No</th>
                      <th className="border border-black p-4">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((dt, index) => {
                        return (
                          <tr
                            key={index}
                            className="even:bg-slate-600 even:text-white odd:bg-gray-300 ">
                            <td className="border border-black p-4">
                              {index + 1}
                            </td>
                            <td className="border border-black p-4">
                              {dt.student.user.email}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <>Loading....</>
          )}
        </main>
      </>
    );
}
