import { BsXCircleFill } from "react-icons/bs";

export default function UserDetails({
  userDetails,
  setUserDetails,
  index,
  detail,
}) {
  if (detail.type == "textarea") {
    return (
      <div className="flex flex-col w-full justify-start items-center">
        <label
          className="w-full flex justify-between bg-primary text-primary-content border-2 border-secondary"
          htmlFor="name">
          <span className="p-4">{detail.name}</span>

          <div
            onClick={() => {
              setUserDetails(userDetails.filter((_, i) => i !== index));
            }}
            className="bg-red-500 p-4 flex justify-center items-center h-full cursor-pointer">
            <BsXCircleFill />
          </div>
        </label>
        <textarea
          className="outline-none p-4 bg-primary text-primary-content w-full border-2 border-t-0 border-secondary "
          name=""
          id=""
          disabled
          cols="30"
          placeholder={detail.placeholder}
          rows="10"></textarea>
      </div>
    );
  } else if (detail.type == "checkbox" || detail.type == "radio") {
    return (
      <div className="flex flex-col w-full justify-start items-center">
        <div className="w-full flex h-full justify-between bg-primary text-primary-content border-2 border-secondary">
          <span className="p-4">{detail.name}</span>

          <div
            onClick={() => {
              setUserDetails(userDetails.filter((_, i) => i !== index));
            }}
            className="bg-red-500 p-4 flex justify-center items-center h-full cursor-pointer">
            <BsXCircleFill />
          </div>
        </div>
        <div className="flex flex-col justify-center w-full items-start p-4 border-2 border-t-0 border-secondary gap-4">
          {detail.options.map((option, ind) => {
            return (
              <div
                key={ind}
                id={ind + "options"}
                className="flex gap-2 text-xl">
                <input
                  name={detail.name}
                  className=" cursor-pointer"
                  disabled
                  id={ind + "" + index}
                  type={detail.type}
                />
                <label className=" cursor-pointer" htmlFor={ind + "" + index}>
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
      <div className="flex w-full items-center border-2 border-secondary">
        <label
          className="min-w-[35%] bg-primary text-primary-content p-4 border-r-2 border-secondary"
          htmlFor={index}>
          {detail.name}
        </label>
        <input
          id="name"
          type={detail.type}
          disabled
          className="outline-none p-4 bg-primary text-primary-content w-full"
          placeholder={detail.placeholder}
        />
        <div
          onClick={() => {
            setUserDetails(userDetails.filter((_, i) => i !== index));
          }}
          className="bg-red-500 w-12 h-full flex justify-center items-center cursor-pointer">
          <BsXCircleFill />
        </div>
      </div>
    );
  }
}
