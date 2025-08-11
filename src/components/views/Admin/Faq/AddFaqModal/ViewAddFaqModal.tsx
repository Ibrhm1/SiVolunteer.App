import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import useViewAddFaqModal from "./useViewAddFaqModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refecthFaq: () => void;
  onOpenChange: () => void;
}

const ViewAddFaqModal = (props: PropTypes) => {
  const { isOpen, onClose, refecthFaq, onOpenChange } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddFaq,
    isPendingMuteteAddFaq,
    isSuccessMuteteAddFaq,
    handleOnClose,
  } = useViewAddFaqModal();

  useEffect(() => {
    if (isSuccessMuteteAddFaq) {
      onClose();
      refecthFaq();
    }
  }, [isSuccessMuteteAddFaq]);

  return (
    <div>
      <Modal
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        onClose={() => handleOnClose(onClose)}
      >
        <form onSubmit={handleSubmitForm(handleAddFaq)}>
          <ModalContent className="mt-4">
            <ModalHeader>Add Faq</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name="question"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Question"
                      className="font-semibold"
                      variant="bordered"
                      isInvalid={!!errors.question}
                      errorMessage={errors.question?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="answer"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Answer"
                      variant="bordered"
                      className="font-semibold"
                      isInvalid={!!errors.answer}
                      errorMessage={errors.answer?.message}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="bordered"
                      disallowEmptySelection
                      className="font-semibold"
                      label="Member or Organizer?"
                      placeholder="Select Member or Organizer"
                      isInvalid={!!errors.type}
                      errorMessage={errors.type?.message}
                    >
                      <SelectItem key="member">Member</SelectItem>
                      <SelectItem key="organizer">Organizer</SelectItem>
                    </Select>
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
                      className="font-semibold"
                      label="Publish or Private?"
                      placeholder="Select Publish or Private"
                      isInvalid={!!errors.isPublish}
                      errorMessage={errors.isPublish?.message}
                    >
                      <SelectItem key="true">Publish</SelectItem>
                      <SelectItem key="false">Private</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => handleOnClose(onClose)}
                disabled={isPendingMuteteAddFaq}
              >
                <MdOutlineCancel size={18} />
                Cancel
              </Button>
              <Button
                color="primary"
                variant="ghost"
                type="submit"
                disabled={isPendingMuteteAddFaq}
              >
                {isPendingMuteteAddFaq ? (
                  <Spinner size="sm" color="primary" />
                ) : (
                  <>
                    <IoCreate size={18} />
                    Add Faq
                  </>
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default ViewAddFaqModal;
