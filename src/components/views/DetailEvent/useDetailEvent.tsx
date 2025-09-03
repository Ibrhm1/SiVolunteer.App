import eventsService from "@/services/events.service";
import regionService from "@/services/region.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();

  const { data: dataDetailEventSlug, refetch: refetchDetailEventSlug } =
    useQuery({
      queryKey: ["EventBySlug"],
      queryFn: async () => {
        const { data } = await eventsService.getEventBySlug(
          `${router.query.slug}`,
        );
        return data.data;
      },
      enabled: router.isReady,
    });

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", dataDetailEventSlug?.location?.region],
    queryFn: async () => {
      const { data } = await regionService.getRegencyById(
        `${dataDetailEventSlug?.location?.region}`,
      );
      return data.data;
    },
    enabled: !!dataDetailEventSlug?.location?.region,
  });

  return {
    dataDetailEventSlug,
    refetchDetailEventSlug,
    dataRegion,
  };
};

export default useDetailEvent;
