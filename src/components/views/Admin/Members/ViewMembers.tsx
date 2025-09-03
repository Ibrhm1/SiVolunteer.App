import { Key, ReactNode, useCallback, useEffect } from "react";
import useViewMembers from "./useViewMembers";
import DataTable from "@/components/UI/DataTable";
import { useRouter } from "next/router";
import { COLUMN_LIST_MEMBERS } from "./ViewMemberConstatns";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button } from "@heroui/react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";

const ViewMembers = () => {
  const { members, isLoadingMembers, formatePhone } = useViewMembers();
  const { push, query, isReady } = useRouter();
  const { setUrlNoSearch } = useChangeUrl();

  const renderCell = useCallback(
    (member: Record<string, unknown>, columnKey: Key) => {
      const cellValue = member[columnKey as keyof typeof member];
      switch (columnKey) {
        case "fullName":
          return <span className="capitalize">{`${cellValue}`}</span>;
        case "email":
          return (
            <Link
              href={`mailto:${cellValue}`}
              className="text-primary-600 flex items-center gap-1"
              target="_blank"
            >
              <IoMdMail />
              {`${cellValue}`}
            </Link>
          );
        case "phone":
          return (
            <Button
              as={Link}
              color="success"
              href={`https://wa.me/${formatePhone(`${cellValue}`)}`}
              className="font-semibold"
              size="sm"
              target="_blank"
            >
              <FaWhatsapp size={16} />
              Hubungi Member
            </Button>
          );
        case "active":
          return (
            <span
              className={`font-semibold ${cellValue ? "text-green-500" : "text-red-500"}`}
            >
              {cellValue ? "Active" : "Inactive"}
            </span>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  useEffect(() => {
    if (isReady) {
      setUrlNoSearch();
    }
  }, [isReady]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_MEMBERS}
          data={members?.data || []}
          emptyContent="Data not found"
          totalPage={members?.pagination.totalPages}
          isLoading={isLoadingMembers}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default ViewMembers;
