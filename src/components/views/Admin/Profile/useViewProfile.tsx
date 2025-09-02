import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import { IUserUpdate } from "@/types/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewProfile = () => {
  const getProfile = async () => {
    const { data } = await authService.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: true,
  });

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: async (payload: IUserUpdate) => {
      const { data } = await userService.updateProfile(payload);
      return data;
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success update profile", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const handleUpdateProfile = (data: IUserUpdate) => mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    refetchProfile,
  };
};

export default useViewProfile;
