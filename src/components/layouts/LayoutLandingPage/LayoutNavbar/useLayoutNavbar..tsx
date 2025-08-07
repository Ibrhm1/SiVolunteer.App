import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constant";
import useDebounce from "@/hooks/useDebounce";
import authService from "@/services/auth.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLayoutNavbar = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const [search, setSearch] = useState("");

  const getProfile = async () => {
    const { data } = await authService.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    isPending: isPendingDataProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  const getEventSearch = async () => {
    const params = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&search=${search}`;
    const response = await eventsService.getEvents(params);
    const { data } = response;
    return data;
  };

  const {
    data: dataEventsSearch,
    isLoading: isLoadingEventsSearch,
    isRefetching: isRefetchingEventsSearch,
  } = useQuery({
    queryKey: ["Events", search],
    queryFn: getEventSearch,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,
    isPendingDataProfile,
    refetchProfile,

    search,
    setSearch,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,

    handleSearch,
  };
};

export default useLayoutNavbar;
