import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { ICategory } from "@/types/Category";

const categoryService = {
  createCategory: (payload: ICategory) =>
    instance.post(`${endpointService.CATEGORY}`, payload),
  getCategoryById: (id: string) =>
    instance.get(`${endpointService.CATEGORY}/${id}`),
  getAllCategories: (params?: string) =>
    instance.get(`${endpointService.CATEGORY}?${params}`),
  updateCategory: (id: string, payload: ICategory) =>
    instance.put(`${endpointService.CATEGORY}/${id}`, payload),
  deleteCategory: (id: string) =>
    instance.delete(`${endpointService.CATEGORY}/${id}`),
};

export default categoryService;
