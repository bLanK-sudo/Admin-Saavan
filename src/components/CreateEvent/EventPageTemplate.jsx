import CustomMDX from "@/components/CreateEvent/CustomMdx";
import { Title } from "@/components/CreateEvent/EventShards";

export default function EventPageTemplate({ title, data }) {
  return (
    <div className="event-page-wrapper">
      <Title title={title} />
      <CustomMDX source={data} />
    </div>
  );
}
