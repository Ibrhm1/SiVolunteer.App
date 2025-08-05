import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IEventVolunteerStatus } from "@/types/EventVolunteer";

const eventVolunteerService = {
  getAllEventVolunteer: (params?: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}?${params}`),
  getEventVolunteerByEventId: (eventId: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/${eventId}`),
  getEventVolunteerByMember: (params?: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/member?${params}`),
  getEventVolunteerByEvent: (eventId: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/${eventId}`),
  updateStatusEventVolunter: (id: string, status: IEventVolunteerStatus) =>
    instance.put(`${endpointService.EVENT_VOLUNTEERS}/${id}/status`, {
      status,
    }),
};

export default eventVolunteerService;
