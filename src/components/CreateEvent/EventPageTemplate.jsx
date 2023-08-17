import CustomMDX from "@/components/CreateEvent/CustomMdx";
import { Title } from "@/components/CreateEvent/EventShards";

export default function EventPageTemplate({ eventName, data, ...props }) {
  const {
    dates, links, location
  } = props

  return (
    <div className="event-page-wrapper">
      <Title title={eventName} dates={dates} links={links} venue={location} {...props} />
      <CustomMDX source={data} />
    </div>
  );
}
