import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface PropTypes {
  textButtonDetail?: string;
  onPressButtonDetail: () => void;
  showButtonDelete?: boolean;
  onPressButtonDelete?: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const {
    textButtonDetail = "Detail",
    onPressButtonDetail,
    onPressButtonDelete,
    showButtonDelete = true,
  } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="sm"
          variant="bordered"
          color="default"
          className="font-semibold"
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      {showButtonDelete ? (
        <DropdownMenu variant="faded">
          <DropdownItem
            key={"detail-event"}
            onPress={onPressButtonDetail}
            startContent={<IoMdInformationCircleOutline />}
          >
            {textButtonDetail}
          </DropdownItem>
          <DropdownItem
            color="danger"
            key={"delete-event"}
            className="text-danger-500"
            startContent={<FaRegTrashAlt />}
            onPress={onPressButtonDelete}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownItem key={"detail-event"} onPress={onPressButtonDetail}>
            {textButtonDetail}
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default DropdownAction;
