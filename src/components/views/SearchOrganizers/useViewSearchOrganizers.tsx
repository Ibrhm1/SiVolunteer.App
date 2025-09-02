import useChangeUrl from "@/hooks/useChangeUrl";
import organizerServices from "@/services/organizers.service";
import regionService from "@/services/region.service";
import { IOrganizer } from "@/types/Organizer";
import { IRegency } from "@/types/region";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewSearchOrganizers = () => {
  const { currentLimit, currentPage } = useChangeUrl();
  const router = useRouter();

  const { data: dataOrganizers = [], isLoading: isLoadingOrganizers } =
    useQuery({
      queryKey: ["Organizers", currentLimit, currentPage],
      queryFn: async () => {
        const { data } = await organizerServices.getAllOrganizer(
          `limit=${currentLimit}&page=${currentPage}`,
        );
        return data.data as IOrganizer[];
      },
      enabled: router.isReady && !!currentLimit && !!currentPage,
    });

  const { data: dataOrganizersPagination } = useQuery({
    queryKey: ["OrganizersPagination", currentLimit, currentPage],
    queryFn: async () => {
      const { data } = await organizerServices.getAllOrganizer(
        `limit=${currentLimit}&page=${currentPage}`,
      );
      return data;
    },
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  const { data: dataRegion = [], isPending: isPendingRegion } = useQuery({
    queryKey: ["Region", dataOrganizers],
    queryFn: async () => {
      const regionIds = dataOrganizers
        .map((item) => item.location?.domicile)
        .filter(Boolean) as string[];
      const results = await Promise.all(
        regionIds.map((id) => regionService.getRegencyById(id)),
      );
      return results.map((res) => res.data.data[0] as IRegency);
    },
    enabled: dataOrganizers.length > 0,
  });

  // Gabungkan data organizer + region
  const mergedData = dataOrganizers.map((organizer, idx) => ({
    ...organizer,
    region: dataRegion[idx] || null,
  }));

  return {
    dataOrganizersPagination,
    mergedData,
    isLoadingOrganizers,
    dataRegion,
    isPendingRegion,
  };
};

export default useViewSearchOrganizers;
