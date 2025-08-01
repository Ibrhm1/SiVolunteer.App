import { Key, ReactNode, useMemo } from "react";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import { cn } from "@/utils/cn";
import useChangeUrl from "@/hooks/useChangeUrl";
import { LIMIT_LIST } from "@/constants/list.constant";
import { RiAddFill } from "react-icons/ri";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  totalPage: number;
  showLimit?: boolean;
  showSearch?: boolean;
  showButton?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    totalPage,
    renderCell,
    showLimit = true,
    showSearch = true,
    showButton = true,
  } = props;

  const {
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    currentLimit,
    currentPage,
  } = useChangeUrl();

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-[24%]"
            placeholder="Search by name"
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
          />
        )}
        {showButton && buttonTopContentLabel && (
          <Button
            color="primary"
            onPress={onClickButtonTopContent}
            className="font-semibold"
          >
            <RiAddFill className="text-xl font-bold" />
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);

  const buttonContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-sm">Show:</p>}
            aria-label="Select limit"
            disallowEmptySelection
          >
            {LIMIT_LIST.map((limit) => (
              <SelectItem key={limit.key}>{limit.label}</SelectItem>
            ))}
          </Select>
        )}
        {totalPage > 1 && (
          <Pagination
            loop
            showControls
            color="secondary"
            total={totalPage}
            page={Number(currentPage)}
            onChange={handleChangePage}
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPage,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={buttonContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      aria-label="Data Table"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="bg-foreground-700/30 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <Spinner color="primary" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
