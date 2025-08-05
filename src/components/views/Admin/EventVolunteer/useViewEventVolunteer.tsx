import useChangeUrl from "@/hooks/useChangeUrl";
import eventVolunteerService from "@/services/eventVolunteer.service";
import userService from "@/services/user.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { IEventVolunteer } from "@/types/EventVolunteer";

const useViewEventVolunteer = () => {
  const router = useRouter();
  const { currentLimit, currentPage } = useChangeUrl();

  // Ambil semua data event volunteer
  const {
    data: dataEventVolunteer,
    isLoading: isLoadingEventVolunteer,
    isRefetching: isRefetchingEventVolunteer,
  } = useQuery({
    queryKey: ["EventVolunteer", currentPage, currentLimit],
    queryFn: async () => {
      const params = `limit=${currentLimit}&page=${currentPage}`;
      const res = await eventVolunteerService.getAllEventVolunteer(params);
      return res;
    },
    enabled: router.isReady,
  });

  // Ambil data member dan event untuk semua event volunteer
  const {
    data: combinedData,
    isLoading: isLoadingCombined,
    isRefetching: isRefetchingCombined,
  } = useQuery({
    queryKey: ["CombinedEventVolunteer", dataEventVolunteer],
    queryFn: async () => {
      const volunteers = dataEventVolunteer?.data.data || [];

      // Ambil semua data member dan event secara paralel
      const membersPromise = Promise.all(
        volunteers.map((item: IEventVolunteer) =>
          userService
            .getMemberById(`${item.userId}`)
            .then((res) => res.data.data.fullName),
        ),
      );

      const eventsPromise = Promise.all(
        volunteers.map((item: IEventVolunteer) =>
          eventsService
            .getEventById(`${item.eventId}`)
            .then((res) => res.data.data.name),
        ),
      );

      const [members, events] = await Promise.all([
        membersPromise,
        eventsPromise,
      ]);

      // Gabungkan data
      const combined = volunteers.map(
        (item: IEventVolunteer, index: number) => ({
          ...item,
          member: members[index],
          event: events[index],
        }),
      );

      return combined;
    },
    enabled: !!dataEventVolunteer?.data?.data.length,
  });

  return {
    dataCombined: combinedData,
    dataEventVolunteer,
    isLoading: isLoadingEventVolunteer || isLoadingCombined,
    isRefetching: isRefetchingEventVolunteer || isRefetchingCombined,
  };
};

export default useViewEventVolunteer;
