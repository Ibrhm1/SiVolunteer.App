import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IEventVolunteerRegister } from "@/types/EventVolunteer";

const eventVolunteerService = {
  createEventVolunteer: (payload: IEventVolunteerRegister, eventId: string) =>
    instance.post(`${endpointService.EVENT_VOLUNTEERS}/${eventId}`, payload),
  getAllEventVolunteer: (params?: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}?${params}`),
  getEventVolunteerByEventId: (eventId: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/${eventId}`),
  getEventVolunteerByMember: (params?: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/member?${params}`),
  getEventVolunteerByEvent: (eventId: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/${eventId}`),
  updateStatusEventVolunter: (id: string, status: string) =>
    instance.put(`${endpointService.EVENT_VOLUNTEERS}/${id}/status`, {
      status,
    }),
  deleteEventVolunteer: (id: string) =>
    instance.delete(`${endpointService.EVENT_VOLUNTEERS}/${id}`),
};

export default eventVolunteerService;
