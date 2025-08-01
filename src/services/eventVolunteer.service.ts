import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";

const eventVolunteerService = {
  getAllEventVolunteer: (params?: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}?${params}`),
  getEventVolunteerByEventId: (eventId: string) =>
    instance.get(`${endpointService.EVENT_VOLUNTEERS}/${eventId}`),
};

export default eventVolunteerService;
