import instance from "@/libs/axios/instance";
import { IRegisterUser, IUpdatePassword } from "@/types/Auth";
import endpointService from "./endpoint.service";
import { IUserUpdate } from "@/types/User";

const userService = {
  register: (payload: IRegisterUser) =>
    instance.post(`${endpointService.AUTH}/register`, payload),
  getAllMember: () => instance.get(`${endpointService.MEMBER}`),
  getMemberById: (id: string) =>
    instance.get(`${endpointService.MEMBER}/${id}`),
  updateProfile: (payload: IUserUpdate) =>
    instance.put(`${endpointService.AUTH}/update-profile`, payload),
  updatePassword: (payload: IUpdatePassword) =>
    instance.put(`${endpointService.AUTH}/update-password`, payload),
};

export default userService;
