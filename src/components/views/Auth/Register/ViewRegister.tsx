import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";

const ViewRegister = () => {
  return (
    <main className="flex flex-col items-center gap-2 md:flex-row">
      <Link href={"/auth/register/member"}>
        <Card className="max-w-[300px] px-5 py-2">
          <CardHeader>
            <div className="flex w-full items-center justify-center gap-1 font-bold">
              <FaRegUser />
              <h1>Member</h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <span className="text-sm">
              Join as a Member and discover various volunteer activities that
              you can participate in to contribute directly!
            </span>
          </CardBody>
        </Card>
      </Link>
      <Link href={"/auth/register/organizer"}>
        <Card className="max-w-[300px] px-5 py-2">
          <CardHeader>
            <div className="flex w-full items-center justify-center gap-1 font-bold">
              <VscOrganization className="text-xl" />
              <h1>Organizer</h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <span className="text-sm">
              Want to organize a social event or volunteer activity? Register
              yourself as an Organizer and start creating your own activities!
            </span>
          </CardBody>
        </Card>
      </Link>
    </main>
  );
};

export default ViewRegister;
