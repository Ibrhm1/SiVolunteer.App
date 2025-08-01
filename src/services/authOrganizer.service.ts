import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IRegisterOrganizer } from "@/types/Auth";

const organizerServices = {
  registerOrganizer: (payload: IRegisterOrganizer) =>
    instance.post(`${endpointService.AUTH}/register/organizer`, payload),
  getOrganizerById: (id: string) =>
    instance.get(`${endpointService.ORGANIZER}/${id}`),
  getAllOrganizer: (params?: string) =>
    instance.get(`${endpointService.ORGANIZER}?${params}`),
};

export default organizerServices;
