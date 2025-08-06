import authService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useLayoutNavbar = () => {
  const router = useRouter();

  const getProfile = async () => {
    const { data } = await authService.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    isPending: isPendingDataProfile,
    isSuccess: isSuccessDataProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  return {
    dataProfile,
    isPendingDataProfile,
    isSuccessDataProfile,
    refetchProfile,
  };
};

export default useLayoutNavbar;
