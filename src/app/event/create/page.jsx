"use client";

import { useState } from "react";
import MDEditor, {
  bold,
  codeBlock,
  italic,
  strikethrough,
  hr,
  group,
  divider,
  link,
  quote,
  image,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
} from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import EventPageTemplate from "@/components/CreateEvent/EventPageTemplate.jsx";
import axios from "@/components/axios";
import { useAuth } from "@/context/AuthContext";
import { categoriesMap } from "@/components/constants";

const InformativeLink = ({ name, value, setName, setValue }) => {
  return (
    <div className="flex border-2 border-t-0 border-secondary w-full">
      <select
        className="outline-none p-4 bg-primary text-primary-content w-full border-r-2 border-secondary"
        value={name}
        onChange={setName}>
        <option value="" defaultChecked>
          (Select a type of link)
        </option>
        <option value="website">Website</option>
        <option value="youtube">Youtube</option>
        <option value="meet">Google Meet</option>
      </select>
      <input
        type="url"
        className="outline-none p-4 bg-primary text-primary-content w-full"
        placeholder="Enter URL"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

const SponsorRow = ({ title, setValue, ...props }) => {
  const { name, logo, website, type } = props;
  return (
    <div className="flex border-2 border-t-0 border-secondary w-full">
      <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary align-center font-bold">
        {title}
      </label>
      <div>
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter sponsor's name"
          value={name}
          onChange={(e) => setValue(e, "name")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter sponsor's logo"
          value={logo}
          onChange={(e) => setValue(e, "logo")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter sponsor's website"
          value={website}
          onChange={(e) => setValue(e, "website")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full"
          placeholder="Enter type of sponsor"
          value={type}
          onChange={(e) => setValue(e, "type")}
        />
      </div>
    </div>
  );
};

const TeamMember = ({ title, setValue, ...props }) => {
  const { name, email, phone, role } = props;
  return (
    <div className="flex border-2 border-t-0 border-secondary w-full">
      <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary text-center font-bold">
        {title}
      </label>
      <div>
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter team mate's name"
          value={name}
          onChange={(e) => setValue(e, "name")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter team mate's email"
          value={email}
          onChange={(e) => setValue(e, "email")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter team mate's phone"
          value={phone}
          onChange={(e) => setValue(e, "phone")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full"
          placeholder="Enter role assigned to team mate"
          value={role}
          onChange={(e) => setValue(e, "role")}
        />
      </div>
    </div>
  );
};

const JudgesRow = ({ title, setValue, ...props }) => {
  const { name, email, bio, image } = props;
  return (
    <div className="flex border-2 border-t-0 border-secondary w-full">
      <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary text-center font-bold">
        {title}
      </label>
      <div>
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter judge's name"
          value={name}
          onChange={(e) => setValue(e, "name")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter judge's email"
          value={email}
          onChange={(e) => setValue(e, "email")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full border-b border-black"
          placeholder="Enter judge's bio"
          value={bio}
          onChange={(e) => setValue(e, "bio")}
        />
        <input
          type="text"
          className="outline-none p-4 bg-primary text-primary-content w-full"
          placeholder="Enter judge's image"
          value={image}
          onChange={(e) => setValue(e, "image")}
        />
      </div>
    </div>
  );
};

export default function CreateEvent() {
  const {token} = useAuth()
  const emptyDummyObj = {
    name: "",
    value: "",
  };
  const emptyEventDetailsObj = {
    name: "Event Name",
    category: "",
    eventDate: new Date(),
    registrationStartDate: new Date(),
    registrationEndDate: new Date(),
    location: "",
    maxParticipants: 0,
    isTeamEvent: false,
  };
  const emptyTeammateObj = {
    name: "",
    email: "",
    phone: "",
    role: "",
  };
  const emptySponsorObj = {
    name: "",
    logo: "",
    website: "",
    type: "",
  };
  const emptyJudgeObj = {
    name: "",
    bio: "",
    email: "",
    image: "",
  };
  const defaultEditorText = `# About the Event

# Rules and Guidelines`;

  // Component States
  const [value, setValue] = useState(defaultEditorText);
  const [infol, setInfol] = useState([{ ...emptyDummyObj }]);
  const [sponsors, setSponsor] = useState([{ ...emptySponsorObj }]);
  const [eventDetails, setEventDetails] = useState({ ...emptyEventDetailsObj });
  const [judges, setJudges] = useState([{ ...emptyJudgeObj }]);
  const [teammates, setTeammates] = useState([{ ...emptyTeammateObj }]);
  const [headerImg, setHeaderImg] = useState('')

  const setDriveLink = (l, s) => {
    const id = l.split('/')[5]
    const nl = `https://drive.google.com/uc?id=${id}&export=download`
    s(nl)
  }

  const getInformativeLinkFromKey = (key) => infol.filter(({ name }) => name == key)[0]?.value ?? "";

  const getPayload = () => ({
      name: eventDetails.name,
      description: value,
      location: eventDetails.location,
      max_participants: eventDetails.maxParticipants,
      is_team_event: eventDetails.isTeamEvent,
      header_img: headerImg,
      meet_link: getInformativeLinkFromKey("meet"),
      fb_link: getInformativeLinkFromKey("facebook"),
      ig_link: getInformativeLinkFromKey("instagram"),
      yt_link: getInformativeLinkFromKey("youtube"),
      twitter_link: getInformativeLinkFromKey("twitter"),
      website_link: getInformativeLinkFromKey("website"),
      misc_link: getInformativeLinkFromKey("misc"),
      registration_start_date: (new Date(eventDetails.registrationStartDate)).toISOString(),
      registration_end_date: (new Date(eventDetails.registrationEndDate)).toISOString(),
      date: (new Date(eventDetails.eventDate)).toISOString(),
      category: categoriesMap[eventDetails.category],
      team: [...teammates],
      judges: [...judges],
      sponsors: [...sponsors],
      // "mentors": [
      //   {
      //     "name": "",
      //     "email": "",
      //     "bio": "",
      //     "image": ""
      //   }
      // ],
      // "speakers": [
      //   {
      //     "name": "",
      //     "email": "",
      //     "bio": "",
      //     "image": ""
      //   }
      // ],
      // "pictures": [
      //   {
      //     "image": ""
      //   }
      // ],
  })

  const submitData = (e) => {
    const payload = getPayload()
    console.log(JSON.stringify(payload));
    const accessToken = token.accessToken
    axios.post(
        "events/create-event/",
        { ...payload },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
        }
      });
  };

  const addInformativeLink = (e) => {
    setInfol([...infol, { ...emptyDummyObj }]);
  };

  const addSponsor = (e) => {
    setSponsor([...sponsors, { ...emptySponsorObj }]);
  };

  const addJudge = (e) => {
    setJudges([...judges, { ...emptyDummyObj }]);
  };

  const addTeammate = (e) => {
    if (teammates.length < 4)
      setTeammates([...teammates, { ...emptyTeammateObj }]);
  };

  const updateObjArrValue = (e, i, arr, key, setter) => {
    const v = e.target.value;
    const newArr = [...arr];
    newArr[i][key] = v;
    setter([...newArr]);
  };

  const updateObjValue = (e, obj, key, setter) => {
    const v = e.target.value;
    const newObj = { ...obj, [key]: v };
    setter({ ...newObj });
  };

  const removeLastChild = (arr, s) => {
    if (arr.length > 1) arr.pop();
    s([...arr]);
  };
  const {
    meet_link,
    fb_link,
    ig_link,
    yt_link,
    twitter_link,
    website_link,
    misc_link,
    registration_start_date,
    registration_end_date,
    date,
    ...p
  } = getPayload()

  const links = {
    facebook: fb_link,
    twitter: twitter_link,
    instagram: ig_link,
    website: website_link,
    misc: misc_link,
    meet: meet_link,
    youtube: yt_link,
  }
  const dates = {
    event_start_date: date,
    event_end_date: '',
    registration_start_date,
    registration_end_date,
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl p-4 text-center">Create Event Page</h1>
        <div className="text-center max-w-[700px]">
          Complete all the mandatory fields given below.
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
        {/* Event details */}
        <div className=" flex flex-col w-full">
          <div className=" flex flex-col border-2 items-center border-secondary">
            <input
              type="text"
              className="outline-none p-4 bg-primary text-primary-content w-full border-b-2 border-secondary"
              placeholder="Event Name"
              onChange={(e) =>
                updateObjValue(e, eventDetails, "name", setEventDetails)
              }
              value={eventDetails.name}
            />
            <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Event Category
              </label>
              <select
                className="outline-none p-4 bg-primary text-primary-content w-full"
                onChange={(e) =>
                  updateObjValue(e, eventDetails, "category", setEventDetails)
                }
                value={eventDetails.category}>
                <option value="" defaultChecked>
                  (Select a category)
                </option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="technical">Technical</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Are participants supposed to form teams to participate in your
                event?
              </label>
              <select
                className="outline-none p-4 bg-primary text-primary-content w-full"
                onChange={(e) =>
                  updateObjValue(
                    e,
                    eventDetails,
                    "isTeamEvent",
                    setEventDetails
                  )
                }
                value={eventDetails.isTeamEvent}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Max number of participants
              </label>
              <input
                type="number"
                className="outline-none p-4 bg-primary text-primary-content"
                placeholder="Max participants"
                onChange={(e) =>
                  updateObjValue(
                    e,
                    eventDetails,
                    "maxParticipants",
                    setEventDetails
                  )
                }
                value={eventDetails.maxParticipants}
              />
            </div>
            <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Event's header image
              </label>
              <input
                type="text"
                className="outline-none p-4 bg-primary text-primary-content"
                placeholder="Event Name"
                onChange={(e) => setDriveLink(e.target.value, setHeaderImg)}
                value={headerImg}
              />
            </div>
            {/* <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Payment Type
              </label>
              <select className="outline-none p-4 bg-primary text-primary-content w-full">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div> */}
            <input
              type="text"
              className="outline-none p-4 bg-primary text-primary-content w-full border-b-2 border-secondary"
              placeholder="Event Venue"
              value={eventDetails.location}
              onChange={(e) =>
                updateObjValue(e, eventDetails, "location", setEventDetails)
              }
            />
            <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Event Date
              </label>
              <input
                type="date"
                className="outline-none p-4 bg-primary text-primary-content w-full"
                placeholder="Event Time"
                value={eventDetails.eventDate}
                onChange={(e) =>
                  updateObjValue(e, eventDetails, "eventDate", setEventDetails)
                }
              />
            </div>
            <div className="flex w-full items-center border-b-2 border-secondary">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Registration Open Date
              </label>
              <input
                id="open"
                type="date"
                className="outline-none p-4 bg-primary text-primary-content w-full"
                placeholder="Event Time"
                value={eventDetails.registrationStartDate}
                onChange={(e) =>
                  updateObjValue(
                    e,
                    eventDetails,
                    "registrationStartDate",
                    setEventDetails
                  )
                }
              />
            </div>
            <div className="flex w-full items-center">
              <label className="min-w-[35%] bg-primary text-primary-content p-4 h-full border-r-2 border-secondary font-extrabold uppercase">
                Registration Close Date
              </label>
              <input
                type="date"
                className="outline-none p-4 bg-primary text-primary-content w-full"
                placeholder="Event Time"
                value={eventDetails.registrationEndDate}
                onChange={(e) =>
                  updateObjValue(
                    e,
                    eventDetails,
                    "registrationEndDate",
                    setEventDetails
                  )
                }
              />
            </div>
          </div>
        </div>
        {/* Event links, judges and sponsors */}
        <div className="flex flex-col w-full h-full">
          <div className=" flex flex-col border-2 items-center border-secondary h-full">
            <div className="flex flex-col w-full justify-start items-center p-1">
              <label className="w-full flex flex-wrap justify-between items-center bg-primary text-primary-content border-2 border-secondary">
                <div className="p-4 font-extrabold uppercase">
                  Team mates
                </div>
                <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
                  <button
                    onClick={addTeammate}
                    className="p-4 select-none bg-green-600 hover:bg-green-900 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 border-x border-black uppercase">
                    Add
                  </button>
                  <button
                    onClick={() => removeLastChild(teammates, setTeammates)}
                    className="p-4 select-none bg-red-600 hover:bg-red-800 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 uppercase">
                    Remove
                  </button>
                </div>
              </label>
              {teammates.map((obj, ind, arr) => (
                <TeamMember
                  {...obj}
                  key={`${arr.length}_${ind}`}
                  title={`Team mate ${ind + 1}`}
                  setValue={(e, k) =>
                    updateObjArrValue(e, ind, arr, k, setTeammates)
                  }
                />
              ))}
            </div>

            <div className="flex flex-col w-full justify-start items-center p-1">
              <label className="w-full flex flex-wrap justify-between items-center bg-primary text-primary-content border-2 border-secondary">
                <div className="p-4 font-extrabold uppercase">
                  Informative Links
                </div>
                <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
                  <button
                    onClick={addInformativeLink}
                    className="p-4 select-none bg-green-600 hover:bg-green-900 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 border-x border-black uppercase">
                    Add
                  </button>
                  <button
                    onClick={() => removeLastChild(infol, setInfol)}
                    className="p-4 select-none bg-red-600 hover:bg-red-800 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 uppercase">
                    Remove
                  </button>
                </div>
              </label>
              {infol.map((obj, ind, arr) => (
                <InformativeLink
                  {...obj}
                  key={`${obj.name}_${ind}`}
                  setName={(e) =>
                    updateObjArrValue(e, ind, arr, "name", setInfol)
                  }
                  setValue={(e) =>
                    updateObjArrValue(e, ind, arr, "value", setInfol)
                  }
                />
              ))}
            </div>

            <div className="flex flex-col w-full justify-start items-center p-1">
              <label className="w-full flex flex-wrap justify-between items-center bg-primary text-primary-content border-2 border-secondary">
                <span className="p-4 font-extrabold uppercase">Judges</span>
                <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
                  <span
                    onClick={addJudge}
                    className="p-4 select-none bg-green-600 hover:bg-green-900 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 border-x border-black uppercase">
                    Add
                  </span>
                  <span
                    onClick={() => removeLastChild(judges, setJudges)}
                    className="p-4 select-none bg-red-600 hover:bg-red-800 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 uppercase">
                    Remove
                  </span>
                </div>
              </label>
              {judges.map((obj, ind, arr) => (
                <JudgesRow
                  {...obj}
                  title={`Judge ${ind + 1}`}
                  key={`judge${ind + 1}_${ind}`}
                  setValue={(e, k) =>
                    updateObjArrValue(e, ind, arr, k, setJudges)
                  }
                />
              ))}
            </div>

            <div className="flex flex-col w-full justify-start items-center p-1">
              <label className="w-full flex flex-wrap justify-between items-center bg-primary text-primary-content border-2 border-secondary">
                <span className="p-4 font-extrabold uppercase">Sponsors</span>
                <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
                  <span
                    onClick={addSponsor}
                    className="p-4 select-none bg-green-600 hover:bg-green-900 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 border-x border-black uppercase">
                    Add
                  </span>
                  <span
                    onClick={() => removeLastChild(sponsors, setSponsor)}
                    className="p-4 select-none bg-red-600 hover:bg-red-800 hover:text-success-content cursor-pointer font-light lg:h-full flex justify-center items-center duration-200 uppercase">
                    Remove
                  </span>
                </div>
              </label>
              {sponsors.map((obj, ind, arr) => (
                <SponsorRow
                  {...obj}
                  title={`Sponsor ${ind + 1}`}
                  key={`sponsor${ind + 1}_${ind}`}
                  setValue={(e, k) =>
                    updateObjArrValue(e, ind, arr, k, setSponsor)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <MDEditor
          commands={[
            bold,
            codeBlock,
            italic,
            strikethrough,
            hr,
            group,
            divider,
            link,
            quote,
            image,
            unorderedListCommand,
            orderedListCommand,
            checkedListCommand,
          ]}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          value={value}
          onChange={setValue}
          className="min-h-[500px]"
        />
        <EventPageTemplate
          eventName={eventDetails.name}
          dates={dates}
          links={links}
          data={value}
          {...p}
        />
        <button
          className="p-2 px-4 bg-green-500 border border-black uppercase"
          onClick={submitData}>
          Create event
        </button>
      </div>
    </>
  );
}
