import EventCard from "@/components/UI/EventCard";
import { IEvent } from "@/types/Event";
import { Link } from "@heroui/react";
import "swiper/css";

interface PropTypes {
  dataEvents: IEvent[];
  isLoading: boolean;
}

const ViewHomeListEvents = (props: PropTypes) => {
  const { dataEvents, isLoading } = props;

  return (
    <section className="bg-default-100 flex h-[80dvh] flex-col justify-center px-4 lg:px-8">
      <div>
        <h1 className="text-medium text-center font-semibold md:text-xl lg:text-2xl">
          {dataEvents?.length} aksi kebaikan sedang menunggu bantuanmu!
          <br /> Pilih event yang kamu suka dan mulai berdampak hari ini.
        </h1>
        <Link
          color="primary"
          href={"/events"}
          underline="hover"
          className="text-sm md:text-base"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="scroll-x-custom grid auto-cols-[20rem] grid-flow-col gap-2 overflow-x-auto py-3">
        {!isLoading
          ? dataEvents?.map((event) => (
              <EventCard
                key={`${event._id}`}
                event={event}
                className="my-1 first:ml-4 last:mr-4"
              />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <EventCard
                key={`card-skeleton-${index}`}
                isLoading={isLoading}
                className="first:ml-4 last:mr-4"
              />
            ))}
      </div>
    </section>
  );
};

export default ViewHomeListEvents;
