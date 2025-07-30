import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IRegisterOrganizer } from "@/types/Auth";

const organizerServices = {
  registerOrganizer: (payload: IRegisterOrganizer) =>
    instance.post(`${endpointService.AUTH}/register/organizer`, payload),
};

export default organizerServices;
