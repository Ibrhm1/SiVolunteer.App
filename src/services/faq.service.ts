import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IFaq } from "@/types/Faq";

const faqServices = {
  createFaq: (payload: IFaq) =>
    instance.post(`${endpointService.FAQ}`, payload),
  getAllFaq: (params?: string) =>
    instance.get(`${endpointService.FAQ}?${params}`),
  getFaqById: (id: string) => instance.get(`${endpointService.FAQ}/${id}`),
  updateFaq: (id: string, payload: IFaq) =>
    instance.put(`${endpointService.FAQ}/${id}`, payload),
  deleteFaq: (id: string) => instance.delete(`${endpointService.FAQ}/${id}`),
};

export default faqServices;
