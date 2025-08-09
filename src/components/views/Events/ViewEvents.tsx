import EventCard from "@/components/UI/EventCard";
import useViewEvents from "./useViewEvents";
import { IEvent } from "@/types/Event";
import { useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useRouter } from "next/router";
import EventsPagination from "./EventsPagination";
import ViewEventsFilter from "./EventsFilter";

const ViewEvents = () => {
  const router = useRouter();
  const { setUrlExplore } = useChangeUrl();
  const { dataEvents, isLoadingEvents, isRefetchingEvents } = useViewEvents();

  useEffect(() => {
    if (router.isReady) setUrlExplore();
  }, [router.isReady]);

  return (
    <div className="flex w-full flex-col justify-center gap-1 px-4 md:items-center lg:flex-row lg:items-start lg:px-0">
      <div className="mt-2 w-full lg:sticky lg:top-20 lg:mx-2 lg:w-1/4">
        <ViewEventsFilter />
      </div>
      <div className="min-h-[70vh] w-full py-4 lg:mx-0">
        <div className="mb-4 grid grid-cols-1 gap-2 px-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4">
          {!isLoadingEvents && !isRefetchingEvents
            ? dataEvents?.data?.map((event: IEvent) => (
                <EventCard
                  event={event}
                  key={`${event._id}`}
                  className="mx-auto w-full md:w-[14rem] lg:w-[16rem] xl:w-[17rem]"
                />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <EventCard
                  key={`card-skeleton-${index}`}
                  className="mx-auto w-[14rem] md:w-[14rem] lg:w-[16rem]"
                  isLoading={true}
                />
              ))}
        </div>
        {!isLoadingEvents && dataEvents?.data.length > 0 && (
          <EventsPagination
            className="mt-4 flex items-center justify-center"
            totalPages={dataEvents?.pagination?.totalPages}
          />
        )}
        {/* {dataEvents?.length < 1 && !isLoadingEvents && !isRefetchingEvents && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Image
              alt="no data illustration"
              loading="lazy"
              width={300}
              height={300}
              src={"/images/illustration/no-data.svg"}
            />
            <h2 className="text-danger text-center text-2xl font-bold">
              Event is empty
            </h2>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ViewEvents;
