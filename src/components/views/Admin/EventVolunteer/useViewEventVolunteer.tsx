import useChangeUrl from "@/hooks/useChangeUrl";
import eventVolunteerService from "@/services/eventVolunteer.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewEventVolunteer = () => {
  const router = useRouter();
  const { currentLimit, currentPage } = useChangeUrl();

  const {
    data: dataEventVolunteer,
    isLoading: isLoadingEventVolunteer,
    isRefetching: isRefetchingEventVolunteer,
  } = useQuery({
    queryKey: ["EventVolunteer", currentPage, currentLimit],
    queryFn: async () => {
      const params = `limit=${currentLimit}&page=${currentPage}`;
      const { data } = await eventVolunteerService.getAllEventVolunteer(params);
      return data;
    },
    enabled: router.isReady,
  });

  const formatePhone = (phone: string) => phone?.replace(/^08/, "62");

  return {
    dataEventVolunteer,
    isLoadingEventVolunteer,
    isRefetchingEventVolunteer,
    formatePhone,
  };
};

export default useViewEventVolunteer;
