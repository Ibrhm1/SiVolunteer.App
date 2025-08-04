import { DELAY } from "@/constants/list.constant";
import useDebounce from "@/hooks/useDebounce";
import useHandleMedia from "@/hooks/useHandleMedia";
import categoryService from "@/services/category.service";
import eventsService from "@/services/events.service";
import regionService from "@/services/region.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schemaMyEvent = Yup.object().shape({
  name: Yup.string().required("Please input name event"),
  description: Yup.string().min(20).required("Please input description event"),
  startDate: Yup.mixed<DateValue>().required("Please input start date event"),
  endDate: Yup.mixed<DateValue>().required("Please input end date event"),
  image: Yup.mixed<FileList | string>().required("Please input image event"),
  category: Yup.string().required("Please input category event"),
  isOnline: Yup.string().required("Please input type event"),
  isPublish: Yup.string().required("Please input status event"),
  region: Yup.string().when("isOnline", {
    is: "false",
    then: (schema) => schema.required("Region is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  address: Yup.string().when("isOnline", {
    is: "false",
    then: (schema) => schema.required("Address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  requiredVolunteers: Yup.number().required("Please input required volunteers"),
  requirements: Yup.string().required("Please input requirements event"),
  benefits: Yup.string().required("Please input benefits event"),
  tags: Yup.array()
    .of(Yup.string().trim().min(1).required("Please input tags event"))
    .min(1)
    .required("Please input tags event"),
});

const useViewAddMyEventModal = () => {
  const debounce = useDebounce();
  const [searchRegency, setSearchRegency] = useState("");
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingMuteteDeleteFile,
    isPendingMuteteUploadFile,
  } = useHandleMedia();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaMyEvent),
  });
  const preview = watch("image");
  const fileUrl = getValues("image");
  const isOnline = watch("isOnline");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  //* reset ketika modal di tutup
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addMyEvent = async (payload: IEvent) => {
    const { data } = await eventsService.createEvent(payload);
    return data.data;
  };

  const {
    mutate: mutateAddMyEvent,
    isPending: isPendingMutateAddMyEvent,
    isSuccess: isSuccessMutateAddMyEvent,
  } = useMutation({
    mutationFn: addMyEvent,
    onSuccess: () => {
      toast.success("Success create event", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryService.getAllCategories(),
    enabled: true,
  });

  const { data: dataRegion } = useQuery({
    queryKey: ["Regions", searchRegency],
    queryFn: () => regionService.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const handleAddMyEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
      location: {
        region: `${data.region}`,
        address: `${data.address}`,
      },
      tags: data.tags,
    };
    mutateAddMyEvent(payload);
  };

  const handleTags = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (tags: string[]) => void,
  ) => {
    const inputValue = e.target.value;
    const tagsArray = inputValue
      .split(/[, ]+/) // ← pisah pakai koma ATAU spasi
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onChange(tagsArray);
  };

  return {
    isOnline,
    searchRegency,
    handleSearchRegion,
    dataRegion,
    dataCategory,
    control,
    handleSubmitForm,
    errors,
    preview,
    setValue,
    handleTags,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
    isPendingMutateAddMyEvent,
    isSuccessMutateAddMyEvent,
    handleAddMyEvent,
  };
};

export default useViewAddMyEventModal;
