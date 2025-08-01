import useChangeUrl from "@/hooks/useChangeUrl";
import organizerServices from "@/services/authOrganizer.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewOrganizer = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getAllOrganizer = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const result = await organizerServices.getAllOrganizer(params);
    const { data } = result;
    return data;
  };

  const {
    data: dataOrganizer,
    isLoading: isLoadingOrganizer,
    isRefetching: isRefetchingOrganizer,
  } = useQuery({
    queryKey: ["Organizer", currentPage, currentLimit, currentSearch],
    queryFn: getAllOrganizer,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return { dataOrganizer, isLoadingOrganizer, isRefetchingOrganizer };
};

export default useViewOrganizer;
