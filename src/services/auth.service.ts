import instance from "@/libs/axios/instance";
import { IActivation, ILogin, IRegisterUser } from "@/types/Auth";
import endpointService from "./endpoint.service";

const authService = {
  login: (payload: ILogin) =>
    instance.post(`${endpointService.AUTH}/login`, payload),
  activation: (code: IActivation) =>
    instance.post(`${endpointService.AUTH}/activation,`, code),
  getProfile: (token: string) =>
    instance.get(`${endpointService.AUTH}/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authService;
