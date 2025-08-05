import authService from "@/services/auth.service";
import organizerServices from "@/services/authOrganizer.service";
import regionService from "@/services/region.service";
import { IOrganizerUpdate } from "@/types/Organizer";
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

  const updateProfile = async (payload: IOrganizerUpdate) => {
    const { data } = await organizerServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IOrganizerUpdate) => updateProfile(payload),
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

  const { data: dataDefaultRegion } = useQuery({
    queryKey: ["defaultRegion"],
    queryFn: () =>
      regionService.getRegencyById(dataProfile?.location?.domicile),
    enabled: !!dataProfile?.location?.domicile,
  });

  const handleUpdateProfile = (data: IOrganizerUpdate) =>
    mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    refetchProfile,

    dataDefaultRegion,
  };
};

export default useViewProfile;
