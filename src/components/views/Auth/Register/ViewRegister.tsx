import { publicImage } from "@/components/images/render.image";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";

const ViewRegister = () => {
  return (
    <main className="flex flex-col items-center gap-2 md:flex-row">
      <Link href={"/auth/register/member"}>
        <Card className="mx-2 px-5 py-2 md:mx-0 md:max-w-[400px]">
          <CardHeader>
            <div className="flex w-full items-center justify-center gap-1 font-bold">
              <FaRegUser />
              <h1>Member</h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center gap-2">
            <Image
              className="shadow-default-400 rounded-lg shadow"
              src={publicImage.Member}
              alt="Member"
              width={250}
              height={250}
            />
            <span className="text-sm">
              Bergabunglah sebagai Anggota dan temukan berbagai kegiatan
              sukarela yang dapat Anda ikuti untuk berkontribusi secara
              langsung!
            </span>
          </CardBody>
        </Card>
      </Link>
      <Link href={"/auth/register/organizer"}>
        <Card className="mx-2 px-5 py-2 md:mx-0 md:max-w-[400px]">
          <CardHeader>
            <div className="flex w-full items-center justify-center gap-1 font-bold">
              <VscOrganization className="text-xl" />
              <h1>Organizer</h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center gap-2">
            <Image
              className="shadow-default-400 rounded-lg shadow"
              src={publicImage.Organizer}
              alt="Member"
              width={250}
              height={250}
            />
            <span className="text-sm">
              Ingin menyelenggarakan acara sosial atau kegiatan sukarela?
              Daftarkan diri Anda sebagai Penyelenggara dan mulailah membuat
              kegiatan Anda sendiri!
            </span>
          </CardBody>
        </Card>
      </Link>
    </main>
  );
};

export default ViewRegister;
