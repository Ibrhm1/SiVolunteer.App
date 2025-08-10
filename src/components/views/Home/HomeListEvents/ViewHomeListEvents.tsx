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
    <section className="bg-default-100 flex flex-col justify-center px-4 py-5 md:py-8 lg:px-8 lg:py-6">
      <div>
        <h1 className="text-medium text-center font-semibold md:text-xl lg:text-2xl">
          {dataEvents?.length} aksi kebaikan sedang menunggu bantuanmu!
          <br /> Pilih event yang kamu suka dan mulai berdampak hari ini.
        </h1>
        <Link
          color="primary"
          href={"/events"}
          underline="hover"
          className="w-full justify-end px-8 text-sm md:text-base"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="scroll-x-custom grid grid-flow-col gap-2 overflow-x-auto py-3 xl:mx-auto 2xl:gap-4">
        {!isLoading && !!dataEvents
          ? dataEvents?.map((event) => (
              <EventCard
                key={`${event._id}`}
                event={event}
                className="my-1 w-[18rem] xl:w-[19rem]"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <EventCard
                key={`card-skeleton-${index}`}
                isLoading={isLoading}
                className="my-1 w-[18rem] lg:w-[19rem]"
              />
            ))}
      </div>
    </section>
  );
};

export default ViewHomeListEvents;
