import instance from "@/libs/axios/instance";
import { IRegisterUser } from "@/types/Auth";
import endpointService from "./endpoint.service";

const userService = {
  register: (payload: IRegisterUser) =>
    instance.post(`${endpointService.AUTH}/register`, payload),
  updateProfile: () => {},
  updatePassword: () => {},
};

export default userService;
