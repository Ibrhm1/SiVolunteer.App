import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";

const regionService = {
  getRegencyById: (id: string) =>
    instance.get(`${endpointService.REGION}/${id}/regency`),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpointService.REGION}-search?name=${name}`),
};

export default regionService;
