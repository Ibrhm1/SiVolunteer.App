import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import useViewSearchOrganizers from "./useViewSearchOrganizers";
import { IOrganizer } from "@/types/Organizer";
import dayjs from "dayjs";
import { MdDateRange } from "react-icons/md";
import { IRegency } from "@/types/region";

const ViewSearchOrganizers = () => {
  const { dataOrganizers, dataRegion } = useViewSearchOrganizers();

  return (
    <main className="flex gap-2 px-6 py-3">
      <Card className="w-1/5">
        <h1>Search</h1>
      </Card>
      <div className="bg-danger flex w-full gap-4 px-4 py-3">
        {dataOrganizers?.map((organizer: IOrganizer) => (
          <Card key={organizer._id} className="h-[17rem] w-[18rem]">
            <CardHeader className="bg-default-100 items-center justify-center">
              <Avatar size="lg" src={organizer?.logo} />
            </CardHeader>
            <CardBody className="gap-2">
              <h1 className="font-semibold">{organizer?.organizerName}</h1>
              <span className="text-sm font-normal">{organizer?.email}</span>
              <div className="flex gap-1">
                <p className="text-sm">
                  {dataRegion?.map((region: IRegency) => region.name)}
                </p>
                <p className="text-sm">{organizer?.location?.address}</p>
              </div>
            </CardBody>
            <CardFooter className="gap-2">
              <MdDateRange />
              <span className="text-sm">
                {dayjs(`${organizer.dateEstablished}`).format("YYYY MMMM DD")}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ViewSearchOrganizers;
