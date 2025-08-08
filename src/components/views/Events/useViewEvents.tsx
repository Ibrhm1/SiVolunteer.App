import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewEvents = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentCategory, currentIsOnline } =
    useChangeUrl();

  const getEvents = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&category=${currentCategory}&isOnline=${currentIsOnline}`;
    const { data } = await eventsService.getEvents(params);
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: [
      "Events",
      currentPage,
      currentLimit,
      currentCategory,
      currentIsOnline,
    ],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return { dataEvents, isLoadingEvents, isRefetchingEvents, refetchEvents };
};

export default useViewEvents;
