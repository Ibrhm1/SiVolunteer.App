import authService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const useViewDashboardMember = () => {
  const { data: dataProfile, isPending: isPendingDataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      const { data } = await authService.getProfile();
      return data.data;
    },
  });

  const totalData = [
    {
      title: "My Events",
    },
  ];

  return {
    dataProfile,
    isPendingDataProfile,
    totalData,
  };
};

export default useViewDashboardMember;
