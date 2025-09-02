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

  // Ambil data member & event untuk semua event volunteer (tahan error)
  const {
    data: combinedData,
    isLoading: isLoadingCombined,
    isRefetching: isRefetchingCombined,
  } = useQuery({
    queryKey: ["CombinedEventVolunteer", dataEventVolunteer],
    queryFn: async () => {
      const volunteers = dataEventVolunteer?.data?.data || [];

      // Fetch members
      const membersPromise = Promise.allSettled(
        volunteers.map((item: IEventVolunteer) =>
          userService
            .getMemberById(`${item.userId}`)
            .then((res) => res.data?.data?.fullName || null),
        ),
      );

      // Fetch events
      const eventsPromise = Promise.allSettled(
        volunteers.map((item: IEventVolunteer) =>
          eventsService
            .getEventById(`${item.eventId}`)
            .then((res) => res.data?.data?.name || null),
        ),
      );

      const [membersResult, eventsResult] = await Promise.all([
        membersPromise,
        eventsPromise,
      ]);

      // Ambil value atau null jika gagal
      const members = membersResult.map((r) =>
        r.status === "fulfilled" ? r.value : null,
      );
      const events = eventsResult.map((r) =>
        r.status === "fulfilled" ? r.value : null,
      );

      // Gabungkan
      const combined = volunteers.map(
        (item: IEventVolunteer, index: number) => ({
          ...item,
          member: members[index],
          event: events[index],
        }),
      );

      return combined;
    },
    enabled: !!dataEventVolunteer?.data?.data?.length,
  });

  const formatePhone = (phone: string) => phone?.replace(/^08/, "62");

  return {
    dataCombined: combinedData,
    dataEventVolunteer,
    isLoading: isLoadingEventVolunteer || isLoadingCombined,
    isRefetching: isRefetchingEventVolunteer || isRefetchingCombined,
    formatePhone,
  };
};

export default useViewEventVolunteer;
