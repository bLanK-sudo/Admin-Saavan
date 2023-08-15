import { Abril_Fatface } from "next/font/google";

const abril = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });

export default function Register() {
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
                  ID
                </label>
                <input
                  id="name"
                  type="text"
                  className="border-secondary border-b-2 outline-none p-4 bg-primary text-primary-content w-full"
                  placeholder="Student ID"
                />
              </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 m-4">
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
        </div>
      </main>
    </>
  );
}
