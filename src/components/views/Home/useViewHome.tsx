import { LIMIT_CATEGORY, PAGE_DEFAULT } from "@/constants/list.constant";
import organizerServices from "@/services/authOrganizer.service";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";

const useViewHome = () => {
  const getAllEvents = async (params: string) => {
    const { data } = await eventsService.getEvents(params);
    return data.data;
  };

  const { data: dataEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["Events"],
    queryFn: () => getAllEvents(`limit=4&page=1&isPublish=true`),
    enabled: true,
  });

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: async () => {
      const { data } = await categoryService.getAllCategories(
        `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`,
      );
      return data.data;
    },
  });

  const getAlOrganizers = async () => {
    const { data } = await organizerServices.getAllOrganizer();
    return data.data;
  };

  const { data: dataOrganizer, isLoading: isLoadingOrganizer } = useQuery({
    queryKey: ["Organizer"],
    queryFn: getAlOrganizers,
  });

  return {
    dataEvents,
    isLoadingEvents,
    dataCategory,
    isLoadingCategory,
    dataOrganizer,
    isLoadingOrganizer,
  };
};

export default useViewHome;
