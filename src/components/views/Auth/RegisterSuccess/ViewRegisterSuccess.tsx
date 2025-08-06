import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { IoHome } from "react-icons/io5";
import { publicImage } from "@/components/images/render.image";

const ViewRegisterSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={publicImage.Complete}
          alt="logo"
          width={400}
          height={400}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-foreground text-3xl font-bold">
          Yey, kamu berhasil daftar dari bagian kami
        </h1>
        <p className="text-default-500 text-md font-bold">
          Silahkan cek email kamu untuk aktivasi akun
        </p>
        <Button
          variant="solid"
          className="mt-4 w-32"
          color="primary"
          startContent={<IoHome />}
          onPress={() => router.push("/")}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default ViewRegisterSuccess;
