import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination } from "@heroui/react";

interface PropTypes {
  className?: string;
  totalPages: number;
}

const SearchOrganizersPagination = (props: PropTypes) => {
  const { className, totalPages } = props;
  const { handleChangePage, currentPage } = useChangeUrl();

  return (
    <div className={className}>
      <Pagination
        total={totalPages}
        initialPage={1}
        showControls
        page={Number(currentPage)}
        loop
        variant="faded"
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};

export default SearchOrganizersPagination;
