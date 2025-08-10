import { ListBanners } from "@/components/images/render.image";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const ViewAboutInfo = () => {
  return (
    <section className="relative py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
        <div className="grid w-full grid-cols-1 items-center justify-start gap-8 lg:grid-cols-2">
          <div className="inline-flex w-full flex-col items-center justify-start gap-10 lg:items-start">
            <div className="flex w-full flex-col items-center justify-start gap-4 lg:items-start">
              <h2 className="font-manrope text-foreground-900 text-center text-4xl leading-normal font-bold lg:text-start">
                SI VOLUNTEER
              </h2>
              <p className="text-foreground-500 text-center text-base leading-relaxed font-normal lg:text-start">
                SiVolunteer adalah sebuah website yang membantu mempertemukan
                orang-orang yang mau menjadi relawan dengan penyelenggara
                kegiatan sosial. Di sini, penyelenggara bisa membuat dan
                mengumumkan acara, sementara relawan bisa mencari, memilih, dan
                mendaftar kegiatan sesuai minat atau lokasi mereka. Semua
                proses, mulai dari pendaftaran akun, pengelolaan event, hingga
                komunikasi data, dilakukan secara online sehingga lebih cepat,
                rapi, dan mudah diakses kapan saja. Tujuannya, biar kegiatan
                sosial jadi lebih terorganisir dan siapa pun bisa ikut
                berkontribusi membantu sesama dengan lebih praktis.
              </p>
            </div>
            <Button
              className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out hover:bg-indigo-800 sm:w-fit"
              as={Link}
              href="/events"
            >
              <span className="px-1.5 text-sm leading-6 font-medium text-white">
                Get Started
              </span>
            </Button>
          </div>
          <Swiper
            loop
            modules={[EffectFade, Autoplay]}
            className="h-full w-full"
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {ListBanners?.map((banner) => (
              <SwiperSlide key={banner?.id}>
                <Image
                  alt={`${banner?.title}`}
                  className="mx-auto h-full w-full rounded-3xl object-cover lg:mx-0"
                  height={500}
                  src={`${banner?.src}`}
                  width={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ViewAboutInfo;
