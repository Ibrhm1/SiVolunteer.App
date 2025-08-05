import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IRegisterOrganizer, IUpdatePassword } from "@/types/Auth";
import { IOrganizerUpdate } from "@/types/Organizer";

const organizerServices = {
  registerOrganizer: (payload: IRegisterOrganizer) =>
    instance.post(`${endpointService.AUTH}/register/organizer`, payload),
  getOrganizerById: (id: string) =>
    instance.get(`${endpointService.ORGANIZERS}/${id}`),
  getAllOrganizer: (params?: string) =>
    instance.get(`${endpointService.ORGANIZERS}?${params}`),
  updateProfile: (payload: IOrganizerUpdate) =>
    instance.put(`${endpointService.AUTH}/update-profile/organizers`, payload),
  updatePassword: (payload: IUpdatePassword) =>
    instance.put(`${endpointService.AUTH}/update-password/organizers`, payload),
};

export default organizerServices;
