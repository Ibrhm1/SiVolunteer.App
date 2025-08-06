import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { ListBanners } from "@/components/images/render.image";
import Image from "next/image";

const ViewHomeBanners = () => {
  return (
    <main>
      <Swiper
        loop
        modules={[EffectFade, Autoplay]}
        className="h-full w-full"
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {ListBanners?.map((banner) => (
          <SwiperSlide key={banner?.id}>
            <Image
              loading="lazy"
              src={`${banner?.src}`}
              alt={`${banner?.title}`}
              width={1200}
              height={800}
              className="aspect-video h-[50vh] w-full object-cover brightness-50 lg:h-[80vh]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default ViewHomeBanners;
