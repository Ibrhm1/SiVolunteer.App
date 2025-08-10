import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton,
} from "@heroui/react";
import useViewSearchOrganizers from "./useViewSearchOrganizers";
import dayjs from "dayjs";
import { MdDateRange, MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import SearchOrganizersPagination from "./SearchOrganizersPagination";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ViewSearchOrganizers = () => {
  const router = useRouter();
  const { setUrlNoSearch } = useChangeUrl();
  const {
    dataOrganizersPagination,
    mergedData,
    isLoadingOrganizers,
    dataRegion,
    isPendingRegion,
  } = useViewSearchOrganizers();

  useEffect(() => {
    if (router.isReady) setUrlNoSearch();
  }, [router.isReady]);

  return (
    <main className="h-fit py-3">
      <h1 className="w-full text-center text-xl font-semibold lg:text-2xl">
        Cari Organisasi dan gabung dengan mereka
      </h1>
      <div className="flex w-full flex-wrap justify-center gap-4 px-4 py-3 md:justify-start">
        {mergedData?.map((organizer) => (
          <Skeleton
            className="h-fit w-[18rem] rounded-lg md:w-[20rem]"
            isLoaded={!isLoadingOrganizers && !isPendingRegion}
          >
            <Card
              key={organizer._id}
              className="w-[18rem] md:w-[20rem]"
              shadow="lg"
              as={Link}
              href={`/search-organizers/${organizer._id}`}
              isHoverable
              isPressable
            >
              <CardHeader className="bg-default-100 items-center justify-center">
                <Image
                  src={`${organizer?.logo}`}
                  alt="logo"
                  width={100}
                  height={100}
                  className="aspect-square rounded-full object-cover"
                />
              </CardHeader>
              <CardBody className="gap-1">
                <h1 className="font-semibold md:text-lg">
                  {organizer?.organizerName}
                </h1>
                <Link
                  href={`mailto:${organizer?.email}`}
                  className="md:text-md text-primary-300 flex items-center gap-1 text-sm font-normal"
                >
                  <MdEmail />
                  {organizer?.email}
                </Link>
                <div className="mt-2">
                  <p className="text-sm">{organizer?.region?.name}</p>
                  <p className="text-sm">{organizer?.location?.address}</p>
                  <p className="text-sm">{organizer?.region?.province.name}</p>
                </div>
              </CardBody>
              <CardFooter className="gap-2">
                <Chip
                  color="primary"
                  className="text-sm"
                  startContent={<MdDateRange />}
                  variant="flat"
                >
                  {dayjs(`${organizer.dateEstablished}`).format("YYYY MMMM DD")}
                </Chip>
              </CardFooter>
            </Card>
          </Skeleton>
        ))}
      </div>
      {!isLoadingOrganizers &&
        dataOrganizersPagination?.data.data.length > 0 && (
          <SearchOrganizersPagination
            totalPages={dataOrganizersPagination?.data?.pagination?.totalPages}
            className="mt-4 flex items-center justify-center"
          />
        )}
    </main>
  );
};

export default ViewSearchOrganizers;
