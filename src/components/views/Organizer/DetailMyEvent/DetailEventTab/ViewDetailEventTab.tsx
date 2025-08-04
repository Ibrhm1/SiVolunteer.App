import { IEventForm } from "@/types/Event";
import useViewDetailEventTab from "./useViewDetailEventTab";
import { useEffect } from "react";
import { toInputDate } from "@/utils/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  DatePicker,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/region";
import { FaRegSave } from "react-icons/fa";

interface PropTypes {
  dataMyEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  dataDefaultRegion: string;
  refetchMyEvent: () => void;
}

const ViewDetailEventTab = (props: PropTypes) => {
  const {
    dataMyEvent,
    isPendingUpdate,
    isSuccessUpdate,
    onUpdate,
    dataDefaultRegion,
    refetchMyEvent,
  } = props;
  const {
    isOnline,
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    setValueUpdateInfo,
    resetUpdateInfo,

    handleTags,

    dataCategory,

    dataRegion,
    handleSearchRegion,
    searchRegency,
  } = useViewDetailEventTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataMyEvent?.name}`);
    setValueUpdateInfo("description", `${dataMyEvent?.description}`);
    setValueUpdateInfo("startDate", toInputDate(`${dataMyEvent?.startDate}`));
    setValueUpdateInfo("endDate", toInputDate(`${dataMyEvent?.endDate}`));
    setValueUpdateInfo("category", `${dataMyEvent?.category}`);
    setValueUpdateInfo("isOnline", `${dataMyEvent?.isOnline}`);
    setValueUpdateInfo("isPublish", `${dataMyEvent?.isPublish}`);
    setValueUpdateInfo("region", `${dataMyEvent?.location?.region}`);
    setValueUpdateInfo("address", `${dataMyEvent?.location?.address}`);
    setValueUpdateInfo(
      "requiredVolunteers",
      dataMyEvent?.requiredVolunteers || 0,
    );
    setValueUpdateInfo("requirements", `${dataMyEvent?.requirements}`);
    setValueUpdateInfo("benefits", `${dataMyEvent?.benefits}`);
    setValueUpdateInfo("tags", dataMyEvent?.tags || []);
  }, [dataMyEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
      refetchMyEvent();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4">
      <CardBody>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataMyEvent?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Name of event"
                  className="font-semibold"
                  placeholder="Please enter name of event"
                  isInvalid={!!errorsUpdateInfo.name}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataMyEvent?.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  minRows={2}
                  variant="bordered"
                  label="Description"
                  className="font-semibold"
                  placeholder="Please description your event"
                  isInvalid={!!errorsUpdateInfo.description}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>
          <p className="font-semibold">Date</p>
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton
              isLoaded={!!dataMyEvent?.startDate}
              className="rounded-lg md:w-1/2"
            >
              <Controller
                name="startDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    hideTimeZone
                    variant="bordered"
                    showMonthAndYearPickers
                    className="font-semibold"
                    label="When does your event start?"
                    isInvalid={!!errorsUpdateInfo.startDate}
                    errorMessage={errorsUpdateInfo.startDate?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              isLoaded={!!dataMyEvent?.endDate}
              className="rounded-lg md:w-1/2"
            >
              <Controller
                name="endDate"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="When does your event end?"
                    hideTimeZone
                    variant="bordered"
                    showMonthAndYearPickers
                    className="font-semibold"
                    isInvalid={!!errorsUpdateInfo.startDate}
                    errorMessage={errorsUpdateInfo.startDate?.message}
                  />
                )}
              />
            </Skeleton>
          </div>
          <p className="font-semibold">Detail Event</p>
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton
              isLoaded={!!dataMyEvent?.category}
              className="rounded-lg md:w-1/2"
            >
              <Controller
                name="category"
                control={controlUpdateInfo}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    variant="bordered"
                    defaultSelectedKey={dataMyEvent?.category}
                    isInvalid={!!errorsUpdateInfo.category}
                    errorMessage={errorsUpdateInfo.category?.message}
                    onSelectionChange={(value) => onChange(value)}
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={category._id}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataMyEvent} className="rounded-lg md:w-1/2">
              <Controller
                name="isPublish"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Select
                    {...field}
                    disallowEmptySelection
                    label="Status"
                    variant="bordered"
                    defaultSelectedKeys={[
                      dataMyEvent?.isPublish ? "true" : "false",
                    ]}
                    value={dataMyEvent?.isPublish ? "true" : "false"}
                    isInvalid={!!errorsUpdateInfo.isPublish}
                    errorMessage={errorsUpdateInfo.isPublish?.message}
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Private</SelectItem>
                  </Select>
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataMyEvent} className="rounded-lg md:w-1/2">
              <Controller
                name="isOnline"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Select
                    {...field}
                    disallowEmptySelection
                    label="Online or Offline?"
                    variant="bordered"
                    defaultSelectedKeys={[
                      dataMyEvent?.isOnline ? "true" : "false",
                    ]}
                    value={dataMyEvent?.isOnline ? "true" : "false"}
                    isInvalid={!!errorsUpdateInfo.isOnline}
                    errorMessage={errorsUpdateInfo.isOnline?.message}
                  >
                    <SelectItem key="true">Online</SelectItem>
                    <SelectItem key="false">Offline</SelectItem>
                  </Select>
                )}
              />
            </Skeleton>
          </div>
          {isOnline === "false" && (
            <>
              <p className="text-medium font-semibold">Location</p>
              <div className="flex flex-col gap-2 md:flex-row">
                <Skeleton
                  isLoaded={
                    (!!dataMyEvent?.location?.region && !!dataDefaultRegion) ||
                    true
                  }
                  className="rounded-lg md:w-1/2"
                >
                  <Controller
                    name="region"
                    control={controlUpdateInfo}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={
                          dataRegion?.data.data && searchRegency !== ""
                            ? dataRegion?.data.data
                            : []
                        }
                        defaultInputValue={dataDefaultRegion}
                        label="Region"
                        variant="bordered"
                        className="font-semibold"
                        placeholder="Jakarta, Bandung, etc"
                        onSelectionChange={(value) => onChange(value)}
                        onInputChange={(search) => handleSearchRegion(search)}
                        isInvalid={!!errorsUpdateInfo.region}
                        errorMessage={errorsUpdateInfo.region?.message}
                      >
                        {(regency: IRegency) => (
                          <AutocompleteItem key={regency.id}>
                            {regency.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                </Skeleton>
                <Skeleton
                  isLoaded={!!dataMyEvent?.location?.address}
                  className="rounded-lg md:w-1/2"
                >
                  <Controller
                    name="address"
                    control={controlUpdateInfo}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        variant="bordered"
                        className="ont-semibold"
                        placeholder="Jl. Kebon Jeruk, Jakarta Selatan. etc"
                        isInvalid={!!errorsUpdateInfo.address}
                        errorMessage={errorsUpdateInfo.address?.message}
                      />
                    )}
                  />
                </Skeleton>
              </div>
            </>
          )}
          <p className="text-medium font-semibold">Volunteer</p>
          <div className="flex gap-2">
            <Skeleton
              isLoaded={!!dataMyEvent?.requiredVolunteers}
              className="w-1/2 rounded-lg md:w-1/4"
            >
              <Controller
                name="requiredVolunteers"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    isClearable
                    variant="bordered"
                    className="font-semibold"
                    label="Volunteers"
                    placeholder="Required Volunteers"
                    isInvalid={!!errorsUpdateInfo.requiredVolunteers}
                    errorMessage={errorsUpdateInfo.requiredVolunteers?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              className="w-1/2 rounded-lg md:w-3/4"
              isLoaded={!!dataMyEvent?.requirements}
            >
              <Controller
                name="requirements"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Requirements "
                    className="font-semibold"
                    placeholder="Please enter requirements"
                    isInvalid={!!errorsUpdateInfo.requirements}
                    errorMessage={errorsUpdateInfo.requirements?.message}
                  />
                )}
              />
            </Skeleton>
          </div>
          <Skeleton className="rounded-lg" isLoaded={!!dataMyEvent?.benefits}>
            <Controller
              name="benefits"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Benefits"
                  variant="bordered"
                  className="font-semibold"
                  placeholder="Please enter benefits"
                  isInvalid={!!errorsUpdateInfo.benefits}
                  errorMessage={errorsUpdateInfo.benefits?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!!dataMyEvent?.tags}>
            <Controller
              control={controlUpdateInfo}
              name="tags"
              defaultValue={[]}
              render={({ field: { onChange, ...field } }) => (
                <Input
                  label="Tags"
                  variant="bordered"
                  className="font-semibold"
                  onChange={(e) => handleTags(e, onChange)}
                  value={field.value && field.value.join(", ")}
                  placeholder="Separate with commas, for example: social, education, environment"
                  isInvalid={!!errorsUpdateInfo?.tags}
                  errorMessage={errorsUpdateInfo.tags?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="primary"
            variant="ghost"
            className="disabled:bg-default-500 mt-2"
            disabled={isPendingUpdate || !!dataMyEvent?.id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              <>
                <FaRegSave />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ViewDetailEventTab;
