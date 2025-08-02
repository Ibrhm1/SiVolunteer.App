import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";

const useViewMyEvents = () => {
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getEventByOrganizer = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const { data } = await eventsService.getEventByOrganizer(params);
    return data.data;
  };

  const { data: dataMyEvents, isPending: isPendingMyEvents } = useQuery({
    queryKey: ["MyEvents", currentPage, currentLimit, currentSearch],
    queryFn: getEventByOrganizer,
    enabled: !!currentPage && !!currentLimit,
  });

  return { dataMyEvents, isPendingMyEvents };
};

export default useViewMyEvents;
