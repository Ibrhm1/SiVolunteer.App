import useChangeUrl from "@/hooks/useChangeUrl";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewMembers = () => {
  const { currentLimit, currentPage } = useChangeUrl();

  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["members", currentLimit, currentPage],
    queryFn: async () => {
      try {
        const { data } = await userService.getAllMember(
          `limit=${currentLimit}&page=${currentPage}`,
        );
        return data;
      } catch (error) {
        const err = error as Error;
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    },
    enabled: !!currentLimit && !!currentPage,
  });

  const formatePhone = (phone: string) => phone?.replace(/^08/, "62");

  return {
    members,
    isLoadingMembers,
    formatePhone,
  };
};

export default useViewMembers;
