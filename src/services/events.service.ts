import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IEvent } from "@/types/Event";

const eventsService = {
  createEvent: (payload: IEvent) =>
    instance.post(`${endpointService.EVENTS}`, payload),
  getEvents: (params?: string) =>
    instance.get(`${endpointService.EVENTS}?${params}`),
  getEventByOrganizer: (params?: string) =>
    instance.get(`${endpointService.EVENTS}/organizers?${params}`),
  getEventById: (id: string) => instance.get(`${endpointService.EVENTS}/${id}`),
  updateEvent: (id: string, payload: IEvent) =>
    instance.put(`${endpointService.EVENTS}/${id}`, payload),
  deleteEvent: (id: string) =>
    instance.delete(`${endpointService.EVENTS}/${id}`),
};

export default eventsService;
