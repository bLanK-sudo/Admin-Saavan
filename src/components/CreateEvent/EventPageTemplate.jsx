import CustomMDX from "@/components/CreateEvent/CustomMdx";
import { Title } from "@/components/CreateEvent/EventShards";

export default function EventPageTemplate({
  eventName,
  data,
  registration_link,
  ...props
}) {
  const { dates, links, location, team } = props;

  return (
    <div className="event-page-wrapper">
      <Title
        {...props}
        title={eventName}
        dates={dates}
        links={links}
        venue={location}
        registration_link={registration_link}
        team={Array.isArray(team) ? team : team.organizers}
      />
      <CustomMDX source={data} />
    </div>
  );
}
