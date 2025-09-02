import useChangeUrl from "@/hooks/useChangeUrl";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";

const useViewEventAdmin = () => {
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["Events", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      let params = `limit=${currentLimit}&page=${currentPage}`;
      if (currentSearch) {
        params += `&search=${currentSearch}`;
      }
      const response = await eventsService.getEvents(params);
      const { data } = response;
      return data;
    },
  });

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
  };
};

export default useViewEventAdmin;
