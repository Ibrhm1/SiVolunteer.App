import useChangeUrl from "@/hooks/useChangeUrl";
import organizerServices from "@/services/authOrganizer.service";
import regionService from "@/services/region.service";
import { IOrganizer } from "@/types/Organizer";
import { IRegency } from "@/types/region";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewSearchOrganizers = () => {
  const { currentLimit, currentPage } = useChangeUrl();
  const router = useRouter();

  const getAllOrganizers = async () => {
    const { data } = await organizerServices.getAllOrganizer(
      `limit=${currentLimit}&page=${currentPage}`,
    );
    return data.data as IOrganizer[];
  };

  const { data: dataOrganizers = [], isLoading: isLoadingOrganizers } =
    useQuery({
      queryKey: ["Organizers", currentLimit, currentPage],
      queryFn: () => getAllOrganizers(),
      enabled: router.isReady && !!currentLimit && !!currentPage,
    });

  const { data: dataOrganizersPagination } = useQuery({
    queryKey: ["OrganizersPagination", currentLimit, currentPage],
    queryFn: () =>
      organizerServices.getAllOrganizer(
        `limit=${currentLimit}&page=${currentPage}`,
      ),
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  const getRegion = async () => {
    const regionIds = dataOrganizers
      .map((item) => item.location?.domicile)
      .filter(Boolean) as string[];

    const results = await Promise.all(
      regionIds.map((id) => regionService.getRegencyById(id)),
    );

    // Karena tiap response berupa array (contoh: [ { name: 'KOTA ...' } ])
    return results.map((res) => res.data.data[0] as IRegency);
  };

  const { data: dataRegion = [], isPending: isPendingRegion } = useQuery({
    queryKey: ["Region", dataOrganizers],
    queryFn: getRegion,
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
