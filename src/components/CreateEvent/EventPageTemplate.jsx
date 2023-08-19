import CustomMDX from "@/components/CreateEvent/CustomMdx";
import { Title } from "@/components/CreateEvent/EventShards";

export default function EventPageTemplate({ eventName, data, registration_link, ...props }) {
  const {
    dates, links, location,
  } = props

  return (
    <div className="event-page-wrapper">
      <Title title={eventName} dates={dates} links={links} venue={location} registration_link={registration_link} {...props} />
      <CustomMDX source={data} />
    </div>
  );
}
