import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import publicImage from "@/components/images/render.image";

interface PropTypes {
  status: "success" | "failed";
}

const ViewActivation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={status === "success" ? publicImage.Success : publicImage.Fail}
          alt="success illustration"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-transform text-3xl font-bold capitalize">
          {status === "success"
            ? "Yey, akun kamu berhasil diaktivasi"
            : "Yah, kamu gagal aktivasi akun"}
        </h1>
        <p className="text-default-500 text-xl font-bold">
          {status === "success"
            ? "Terima kasih telah bergabung bersama kami"
            : "Silahkan coba lagi"}
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

export default ViewActivation;
