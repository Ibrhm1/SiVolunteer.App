import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";

const ViewNotFound = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-14">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Oppssss...
        </p>
        <p className="mb-4 text-lg font-light">
          Maaf, halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          href="/"
          className="bg-primary rounded-lg px-3 py-2 font-semibold text-white"
        >
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
};

export default ViewNotFound;
