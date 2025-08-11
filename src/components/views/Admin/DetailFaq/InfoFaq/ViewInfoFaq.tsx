import { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { IFaq } from "@/types/Faq";
import useViewInfoFaq from "./useViewInfoFaq";

interface PropTypes {
  dataFaq: IFaq;
  onUpdate: (data: IFaq) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ViewInfoFaq = (props: PropTypes) => {
  const { dataFaq, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    resetUpdateFaq,
    errorsUpdateFaq,
    controlUpdateFaq,
    setValueUpdateFaq,
    handleSubmitUpdateFaq,
  } = useViewInfoFaq();

  useEffect(() => {
    setValueUpdateFaq("question", `${dataFaq?.question}`);
    setValueUpdateFaq("answer", `${dataFaq?.answer}`);
    setValueUpdateFaq("type", `${dataFaq?.type}`);
    setValueUpdateFaq("isPublish", `${dataFaq?.isPublish}`);
  }, [dataFaq]);

  console.log(dataFaq);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateFaq();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4">
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateFaq(onUpdate)}
        >
          <Skeleton isLoaded={!!dataFaq?.question} className="rounded-lg">
            <Controller
              control={controlUpdateFaq}
              name="question"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={!!errorsUpdateFaq.question}
                  errorMessage={errorsUpdateFaq.question?.message}
                  className="font-semibold"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataFaq?.answer} className="rounded-lg">
            <Controller
              control={controlUpdateFaq}
              name="answer"
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="font-semibold"
                  label="Answer"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errorsUpdateFaq.answer}
                  errorMessage={errorsUpdateFaq.answer?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataFaq?.type} className="rounded-lg">
            <Controller
              name="type"
              control={controlUpdateFaq}
              render={({ field }) => (
                <Select
                  {...field}
                  className="font-semibold"
                  defaultSelectedKeys={[dataFaq?.type ? "member" : "organizer"]}
                  disallowEmptySelection
                  label="Member or Organizer?"
                  labelPlacement="outside"
                  placeholder="Select Member or Organizer"
                  value={dataFaq?.type ? "member" : "organizer"}
                  variant="bordered"
                  isInvalid={!!errorsUpdateFaq.type}
                  errorMessage={errorsUpdateFaq.type?.message}
                >
                  <SelectItem key="member">Member</SelectItem>
                  <SelectItem key="organizer">Organizer</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataFaq} className="rounded-lg">
            <Controller
              control={controlUpdateFaq}
              name="isPublish"
              render={({ field }) => (
                <Select
                  {...field}
                  className="font-semibold"
                  defaultSelectedKeys={[dataFaq?.isPublish ? "true" : "false"]}
                  disallowEmptySelection
                  label="Publish or Private?"
                  labelPlacement="outside"
                  placeholder="Select Publish or Private"
                  variant="bordered"
                  value={dataFaq?.isPublish === "true" ? "true" : "false"}
                  isInvalid={!!errorsUpdateFaq.isPublish}
                  errorMessage={errorsUpdateFaq.isPublish?.message}
                >
                  <SelectItem key="true">Publish</SelectItem>
                  <SelectItem key="false">Private</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="primary"
            className="disabled:bg-default-500 mt-2"
            disabled={isPendingUpdate || !dataFaq?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="primary" />
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

export default ViewInfoFaq;
