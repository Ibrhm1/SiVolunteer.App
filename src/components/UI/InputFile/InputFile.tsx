import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import {
  ChangeEvent,
  DragEvent,
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  className?: string;
  errorMessage?: string;
  isDropable?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  name: string;
  label?: ReactNode;
  onDelete?: () => void;
  onUpload?: (files: FileList) => void;
  preview?: string;
}

const InputFile = (props: PropTypes) => {
  const {
    className,
    errorMessage,
    isDropable = false,
    isDeleting,
    isInvalid,
    isUploading,
    label,
    name,
    onDelete,
    onUpload,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener(
        "dragover",
        handleDragOver as unknown as EventListener,
      );
      dropCurrent.addEventListener(
        "drop",
        handleDrop as unknown as EventListener,
      );

      return () => {
        dropCurrent.removeEventListener(
          "dragover",
          handleDragOver as unknown as EventListener,
        );
        dropCurrent.removeEventListener(
          "drop",
          handleDrop as unknown as EventListener,
        );
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      {label}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "bg-foreground-200 hover:bg-default-100 mt-2 flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image fill src={preview} alt="iamge" className="!relative" />
            </div>
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="bg-danger-100 absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded"
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="text-danger-500 h-5 w-5" />
              )}
            </Button>
          </div>
        )}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drop your file here or click to upload"
                : "Click to upload"}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner size="md" color="primary" variant="simple" />
            <p className="text-center text-sm font-semibold text-gray-500">
              Uploading...
            </p>
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="text-danger-500 p-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
