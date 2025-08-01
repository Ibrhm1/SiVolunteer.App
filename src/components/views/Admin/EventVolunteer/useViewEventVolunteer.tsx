import useChangeUrl from "@/hooks/useChangeUrl";
import eventVolunteerService from "@/services/eventVolunteer.service";
import userService from "@/services/user.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewEventVolunteer = () => {
  const router = useRouter();
  const { currentLimit, currentPage } = useChangeUrl();

  // 1. Ambil semua data event volunteer
  const {
    data: dataEventVolunteer,
    isLoading: isLoadingEventVolunteer,
    isRefetching: isRefetchingEventVolunteer,
  } = useQuery({
    queryKey: ["EventVolunteer", currentPage, currentLimit],
    queryFn: async () => {
      const res = await eventVolunteerService.getAllEventVolunteer();
      return res.data;
    },
    enabled: router.isReady,
  });

  // 2. Ambil member berdasarkan userId dari eventVolunteer
  const {
    data: dataMemberEventVolunteer,
    isLoading: isLoadingEventMember,
    isRefetching: isRefetchingEventMember,
  } = useQuery({
    queryKey: ["Member", dataEventVolunteer?.userId],
    queryFn: async () => {
      const res = await userService.getMemberById(
        `${dataEventVolunteer?.userId}`,
      );
      return res.data.data;
    },
    enabled: !!dataEventVolunteer?.userId,
  });

  // 3. Ambil event berdasarkan eventId dari eventVolunteer
  const {
    data: dataEventEventById,
    isLoading: isLoadingEventEventById,
    isRefetching: isRefetchingEventEventById,
  } = useQuery({
    queryKey: ["EventById", dataEventVolunteer?.eventId],
    queryFn: async () => {
      const res = await eventsService.getEventById(
        `${dataEventVolunteer?.eventId}`,
      );
      return res.data.data;
    },
    enabled: !!dataEventVolunteer?.eventId,
  });

  return {
    dataEventVolunteer,
    isLoadingEventVolunteer,
    isRefetchingEventVolunteer,

    dataMemberEventVolunteer,
    isLoadingEventMember,
    isRefetchingEventMember,

    dataEventEventById,
    isLoadingEventEventById,
    isRefetchingEventEventById,
  };
};

export default useViewEventVolunteer;
