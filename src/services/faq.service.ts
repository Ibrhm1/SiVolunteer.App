import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";

const faqServices = {
  getAllFaq: (params?: string) =>
    instance.get(`${endpointService.FAQ}?${params}`),
};

export default faqServices;
