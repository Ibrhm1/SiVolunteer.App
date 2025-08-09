import organizerServices from "@/services/authOrganizer.service";
import regionService from "@/services/region.service";
import { IOrganizer } from "@/types/Organizer";
import { useQuery } from "@tanstack/react-query";

const useViewSearchOrganizers = () => {
  const getAllOrganizers = async () => {
    const { data } = await organizerServices.getAllOrganizer(`limit=10&page=1`);
    return data.data;
  };

  const { data: dataOrganizers, isPending: isPendingOrganizers } = useQuery({
    queryKey: ["Organizers"],
    queryFn: getAllOrganizers,
  });

  const getRegion = async () => {
    const { data } = await regionService.getRegencyById(
      `${dataOrganizers.map((item: IOrganizer) => item.location?.domicile)}`,
    );
    return data.data;
  };

  const { data: dataRegion, isPending: isPendingRegion } = useQuery({
    queryKey: ["Region"],
    queryFn: getRegion,
    enabled: !!dataOrganizers?.location?.domicile,
  });

  return { dataOrganizers, isPendingOrganizers, dataRegion, isPendingRegion };
};

export default useViewSearchOrganizers;
