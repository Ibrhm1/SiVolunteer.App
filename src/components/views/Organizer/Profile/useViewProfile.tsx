import authService from "@/services/auth.service";
import organizerServices from "@/services/organizers.service";
import { IOrganizerUpdate } from "@/types/Organizer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewProfile = () => {
  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      const { data } = await authService.getProfile();
      return data.data;
    },
  });

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: async (payload: IOrganizerUpdate) => {
      const { data } = await organizerServices.updateProfile(payload);
      return data.data;
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

  const handleUpdateProfile = (data: IOrganizerUpdate) =>
    mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    refetchProfile,
  };
};

export default useViewProfile;
