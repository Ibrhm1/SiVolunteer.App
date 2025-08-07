import { publicImage } from "@/components/images/render.image";
import Image from "next/image";
import { MdOutlineMenuBook } from "react-icons/md";

const ViewHomeInfo = () => {
  return (
    <section className="relative flex h-[30dvh] flex-col items-center justify-center px-10 py-6">
      {/* <MdOutlineMenuBook
        className="absolute end-10 top-10 -z-1 opacity-20"
        size={200}
      />
      <Image
        src={publicImage.Info}
        alt="logo"
        width={200}
        height={200}
        className="absolute start-3 -z-10 w-16 opacity-35"
      /> */}
      <div className="w-full md:w-[80%]">
        <h1 className="text-center text-xl font-bold lg:text-3xl">
          Tujuan Kami
        </h1>
        <p className="text-foreground-500 text-center text-sm font-semibold md:text-xl">
          Kami adalah organisasi yang bergerak dalam bidang kemasyarakatan dan
          peningkatan kesejahteraan masyarakat. Kami berkomitmen untuk membantu
          masyarakat dalam menciptakan lingkungan yang lebih baik dan lebih baik
          untuk semua.
        </p>
        <p className="text-foreground-500 text-center text-sm font-semibold md:text-lg">
          Kami berkomitmen untuk membantu masyarakat dalam menciptakan
          lingkungan yang lebih baik dan lebih baik untuk semua.
        </p>
      </div>
    </section>
  );
};

export default ViewHomeInfo;
