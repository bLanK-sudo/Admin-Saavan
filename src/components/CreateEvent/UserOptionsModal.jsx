export default function UserOptionsModal({
  setUserOptionsModal,
  setModal,
  userDetails,
  setUserDetails,
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1]">
        <div className="bg-primary text-primary-content w-full lg:w-1/2 h-max flex flex-col justify-center items-center m-4 rounded-xl">
          <div className="flex flex-col justify-between items-center w-full p-4 gap-4">
            <h1 className="text-2xl font-bold">Add a field</h1>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <input
                  id="placeholder"
                  type="text"
                  className="outline-none p-4 bg-primary text-primary-content w-full border-2 border-secondary"
                  placeholder="Heading/Question"
                />
                <select
                  name=""
                  id="type"
                  defaultValue={"text"}
                  className="outline-none p-4 bg-primary text-primary-content w-full border-2 border-secondary">
                  <option value="checkbox">CheckBox</option>
                  <option value="radio">Radio</option>
                </select>
              </div>
              <div className="flex">
                <div id="user_options" className="h-max flex flex-col gap-2">
                  <div>
                    <input
                      id="placeholder"
                      type="text"
                      className="outline-none p-4 bg-primary text-primary-content w-full border-2 border-secondary"
                      placeholder="Option 1"
                    />
                  </div>
                </div>
                <div
                  onClick={() => {
                    console.log();
                    let div = document.createElement("div");
                    div.className = "flex gap-2  border-2 border-secondary";
                    let remove = document.createElement("div");
                    remove.className =
                      "bg-red-500 p-4 flex justify-center items-center h-full cursor-pointer";
                    remove.innerHTML = "X";
                    remove.addEventListener("click", () => {
                      div.remove();
                    });
                    let length =
                      document.getElementById("user_options").children.length;
                    let input = document.createElement("input");
                    input.id = "placeholder";
                    input.type = "text";
                    input.className =
                      "outline-none p-4 bg-primary text-primary-content w-full";
                    input.placeholder = "Option " + (length + 1) + "";
                    div.appendChild(input);
                    div.appendChild(remove);
                    document.getElementById("user_options").appendChild(div);
                  }}
                  className="p-4 h-max underline font-bold cursor-pointer">
                  Add
                </div>
              </div>
            </div>
            <div className="flex gap-16">
              <button
                onClick={() => {
                  setUserOptionsModal(false);
                }}
                className="p-2 px-4 border-2 border-secondary">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (document.getElementById("placeholder").value === "")
                    return;
                  let options = [];
                  console.log(
                    document.getElementById("user_options").childNodes
                  );
                  Array.from(
                    document.getElementById("user_options").children
                  ).forEach((element) => {
                    options.push(element.children[0].value);
                  });
                  setUserOptionsModal(false);
                  let newField = {
                    name: document.getElementById("placeholder").value,
                    type: document.getElementById("type").value,
                    options: options,
                  };
                  setUserDetails([...userDetails, newField]);
                  console.log(userDetails);
                }}
                className="p-2 px-4 hover:text-accent-content nav-btn border-2 border-secondary">
                <span className="z-[0] relative">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
