import EventCard from "@/components/UI/EventCard";
import { IEvent } from "@/types/Event";

interface PropTypes {
  dataEvents: IEvent[];
  isLoading: boolean;
}

const ViewHomeListEvents = (props: PropTypes) => {
  const { dataEvents, isLoading } = props;

  return (
    <section className="mx-8 mt-4">
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-3 pb-4">
        {dataEvents?.map((event) => (
          <EventCard
            key={`${event._id}`}
            event={event}
            isLoading={isLoading}
            className="first:ml-4 last:mr-0 lg:first:ml-4 lg:last:mr-6"
          />
        ))}
      </div>
    </section>
  );
};

export default ViewHomeListEvents;
