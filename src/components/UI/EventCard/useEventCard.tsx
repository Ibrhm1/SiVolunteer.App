import organizerServices from "@/services/authOrganizer.service";
import categoryService from "@/services/category.service";
import regionService from "@/services/region.service";
import { useQuery } from "@tanstack/react-query";

const useEventCard = (
  organizerId: string,
  categoryId: string,
  regionId: string,
) => {
  const getOrganizerName = async () => {
    const { data } = await organizerServices.getOrganizerById(organizerId);
    return data.data;
  };

  const { data: dataOrganizer, isLoading: isLoadingOrganizer } = useQuery({
    queryKey: ["Organizer", organizerId],
    queryFn: getOrganizerName,
    enabled: !!organizerId,
  });

  const getCaterogryName = async () => {
    const { data } = await categoryService.getCategoryById(categoryId);
    return data.data;
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["Category", categoryId],
    queryFn: getCaterogryName,
    enabled: !!categoryId,
  });

  const getRegionName = async () => {
    const { data } = await regionService.getRegencyById(regionId);
    return data.data;
  };

  const { data: dataRegion, isLoading: isLoadingRegion } = useQuery({
    queryKey: ["Region", regionId],
    queryFn: getRegionName,
    enabled: !!regionId,
  });

  return {
    dataOrganizer,
    isLoadingOrganizer,
    dataCategory,
    isLoadingCategory,
    dataRegion,
    isLoadingRegion,
  };
};

export default useEventCard;
