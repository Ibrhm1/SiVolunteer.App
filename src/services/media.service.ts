import instance from "@/libs/axios/instance";
import endpointService from "./endpoint.service";
import { IFileUrl } from "@/types/File";

const dataHeaderForm = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const mediaService = {
  upload: (payload: FormData) =>
    instance.post(
      `${endpointService.IMAGE}/upload-single`,
      payload,
      dataHeaderForm,
    ),
  delete: (fileUrl: IFileUrl) =>
    instance.delete(`${endpointService.IMAGE}/delete-file`, { data: fileUrl }),
};

export default mediaService;
