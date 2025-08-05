import InputFile from "@/components/UI/InputFile";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useViewAddMyEventModal from "./useViewAddMyEventModal";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/region";
import { getLocalTimeZone, now } from "@internationalized/date";
import { IoCreate } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refecthMyEvent: () => void;
  onOpenChange: () => void;
}

const ViewAddMyEventModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refecthMyEvent } = props;
  const {
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
  } = useViewAddMyEventModal();

  useEffect(() => {
    if (isSuccessMutateAddMyEvent) {
      onClose();
      refecthMyEvent();
    }
  }, [isSuccessMutateAddMyEvent]);

  useEffect(() => {
    if (isOnline === "true") {
      setValue("region", `${0}`);
      setValue("address", "online");
    } else {
      setValue("region", "");
      setValue("address", "");
    }
  }, [isOnline]);

  useEffect(() => {
    setValue("startDate", now(getLocalTimeZone()));
    setValue("endDate", now(getLocalTimeZone()));
  }, [onOpenChange]);

  return (
    <Modal
      size="4xl"
      isOpen={isOpen}
      backdrop="blur"
      placement="center"
      isDismissable={false}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      className="mx-2"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddMyEvent)}>
        <ModalContent>
          <ModalHeader>Add My Event</ModalHeader>
          <ModalBody className="flex gap-2">
            <p className="font-semibold">Information Event</p>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Name of event"
                  className="font-semibold"
                  placeholder="Please enter name of event"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  minRows={2}
                  variant="bordered"
                  label="Description"
                  className="font-semibold"
                  placeholder="Please description your event"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <p className="font-semibold">Date</p>
            <div className="flex flex-col gap-2 md:flex-row">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    hideTimeZone
                    variant="bordered"
                    showMonthAndYearPickers
                    className="font-semibold lg:w-1/2"
                    label="When does your event start?"
                    defaultValue={now(getLocalTimeZone())}
                    isInvalid={!!errors.startDate}
                    errorMessage={errors.startDate?.message}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="When does your event end?"
                    hideTimeZone
                    variant="bordered"
                    showMonthAndYearPickers
                    className="font-semibold lg:w-1/2"
                    defaultValue={now(getLocalTimeZone())}
                    isInvalid={!!errors.startDate}
                    errorMessage={errors.startDate?.message}
                  />
                )}
              />
            </div>
            <p className="font-semibold">Detail Event</p>
            <div className="flex flex-col gap-2 md:flex-row">
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    label="Category"
                    variant="bordered"
                    className="font-semibold lg:w-1/2"
                    defaultItems={dataCategory?.data.data || []}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Please select category"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={category._id}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="isPublish"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="bordered"
                    disallowEmptySelection
                    className="font-semibold lg:w-1/2"
                    label="Publish or Private?"
                    placeholder="Your event is publish or private?"
                    isInvalid={!!errors.isPublish}
                    errorMessage={errors.isPublish?.message}
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Private</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="isOnline"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="bordered"
                    disallowEmptySelection
                    className="font-semibold lg:w-1/2"
                    label="Online or Offline?"
                    placeholder="Your event is online or offline?"
                    isInvalid={!!errors.isOnline}
                    errorMessage={errors.isOnline?.message}
                  >
                    <SelectItem key="true">Online</SelectItem>
                    <SelectItem key="false">Offline</SelectItem>
                  </Select>
                )}
              />
            </div>
            {isOnline === "false" && (
              <>
                <p className="text-medium font-semibold">Location</p>
                <div className="flex gap-2">
                  <Controller
                    name="region"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={
                          dataRegion?.data.data && searchRegency !== ""
                            ? dataRegion?.data.data
                            : []
                        }
                        label="Region"
                        variant="bordered"
                        className="w-1/2 font-semibold"
                        placeholder="Jakarta, Bandung, etc"
                        onSelectionChange={(value) => onChange(value)}
                        onInputChange={(search) => handleSearchRegion(search)}
                        isInvalid={!!errors.region}
                        errorMessage={errors.region?.message}
                      >
                        {(regency: IRegency) => (
                          <AutocompleteItem key={regency.id}>
                            {regency.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        variant="bordered"
                        className="w-1/2 font-semibold"
                        placeholder="Jl. Kebon Jeruk, Jakarta Selatan. etc"
                        isInvalid={!!errors.address}
                        errorMessage={errors.address?.message}
                      />
                    )}
                  />
                </div>
              </>
            )}
            <p className="text-medium font-semibold">Volunteer</p>
            <div className="flex gap-2">
              <Controller
                name="requiredVolunteers"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    isClearable
                    variant="bordered"
                    className="w-1/2 font-semibold md:w-1/4"
                    label="Volunteers"
                    placeholder="Required Volunteers"
                    isInvalid={!!errors.requiredVolunteers}
                    errorMessage={errors.requiredVolunteers?.message}
                  />
                )}
              />
              <Controller
                name="requirements"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Requirements "
                    className="w-1/2 font-semibold md:w-3/4"
                    placeholder="Please enter requirements"
                    isInvalid={!!errors.requirements}
                    errorMessage={errors.requirements?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="benefits"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Benefits"
                  variant="bordered"
                  className="font-semibold"
                  placeholder="Please enter benefits"
                  isInvalid={!!errors.benefits}
                  errorMessage={errors.benefits?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="tags"
              defaultValue={[]}
              render={({ field: { onChange } }) => (
                <Input
                  label="Tags"
                  variant="bordered"
                  className="font-semibold"
                  onChange={(e) => handleTags(e, onChange)}
                  placeholder="Separate with commas, for example: social, education, environment"
                  isInvalid={!!errors.tags}
                  errorMessage={errors.tags?.message}
                />
              )}
            />
            <p className="text-medium font-semibold">Image</p>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  isDropable
                  isInvalid={!!errors.image}
                  errorMessage={errors.image?.message}
                  isDeleting={isPendingMuteteDeleteFile}
                  isUploading={isPendingMuteteUploadFile}
                  onDelete={() => handleDeleteImage(onChange)}
                  preview={typeof preview === "string" ? preview : ""}
                  onUpload={(files) => handleUploadImage(files, onChange)}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={onClose}
              disabled={isPendingMutateAddMyEvent}
            >
              <MdOutlineCancel size={18} />
              Cancel
            </Button>
            <Button
              color="primary"
              variant="ghost"
              type="submit"
              disabled={isPendingMutateAddMyEvent}
            >
              {isPendingMutateAddMyEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                <>
                  <IoCreate size={18} />
                  Create Event
                </>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ViewAddMyEventModal;
