import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdate = Yup.object().shape({
  organizerName: Yup.string().required("Please enter your name organizer"),
  contactPerson: Yup.string().required("Please enter your contact person"),
  phone: Yup.string().required("Please enter your phone number"),
  descriptionOrganizer: Yup.string().required("Please enter your description"),
});

const useViewDetailProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaUpdate),
  });

  return {
    control,
    handleSubmit,
    errors,
    reset,
    setValue,
  };
};

export default useViewDetailProfile;
