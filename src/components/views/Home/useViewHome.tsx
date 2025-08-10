import { LIMIT_CATEGORY, PAGE_DEFAULT } from "@/constants/list.constant";
import organizerServices from "@/services/authOrganizer.service";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useViewHome = () => {
  const { isReady } = useRouter();
  const getAllEvents = async () => {
    const { data } = await eventsService.getEvents(
      `limit=4&page=1&isPublish=true`,
    );
    return data.data;
  };

  const { data: dataEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["Events", isReady],
    queryFn: getAllEvents,
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
