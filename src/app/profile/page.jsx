"use client";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { useState, useEffect, useRef } from "react";

export default function Profile() {
  const { status, token } = useAuth();
  const [data, setData] = useState(null);
  const { event } = useEvent();
  const table = useRef(null);
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
  useEffect(() => {
    getTableData();
  }, [token]);

  useEffect(() => {
    console.log(event);
  }, [event]);

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

          {/* <table className="overflow-x-scroll">
            <thead>
              <tr>
                <td>S.no</td>
                <td>Name</td>
                <td>Email</td>
                {data &&
                  data.map((dt, index) => {
                    return dt.custom_data.map((cd, i) => {
                      return <td> {cd.name} </td>;
                    });
                  })}
              </tr>
            </thead>
            {data &&
              data.map((dt, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>Manish S</td>
                      <td>21f3002911</td>{" "}
                      {dt.custom_data.map((cd, i) => {
                        if (cd.userValue) {
                          return <td>{cd.userValue} </td>;
                        } else if (cd.userOptions) {
                          <td>
                            {cd.options.map((op, j) => {
                              let arr = [];
                              if (cd.userOptions[op]) arr.push(op);
                              return arr;
                            })}
                          </td>;
                        }
                      })}
                    </tr>
                  </tbody>
                );
              })}
            {data && data.custom_data.map((team, index) => {
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
          </table> */}
        </main>
      </>
    );
}
