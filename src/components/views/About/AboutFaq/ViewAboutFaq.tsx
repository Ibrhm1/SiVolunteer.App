import { publicImage } from "@/components/images/render.image";
import { Skeleton, Tab, Tabs } from "@heroui/react";
import Image from "next/image";
import FaqMember from "./FaqMember";
import FaqOrganizer from "./FaqOrganizer";
import useAboutFaq from "./useAboutFaq";

const ViewAboutFaq = () => {
  const { dataFaq, isLoadingFaq } = useAboutFaq();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-full flex-col items-center justify-center gap-x-16 gap-y-5 max-lg:max-w-2xl lg:flex-row lg:justify-between xl:gap-28">
          <div className="w-full lg:w-1/2">
            <Image
              src={publicImage.Faq}
              alt="faq"
              width={600}
              height={600}
              className="shadow-default-400 w-full rounded-xl object-cover shadow-[0_0_8px]"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-10">
                <h6 className="mb-2 text-center text-lg font-medium text-indigo-600 lg:text-left">
                  Frequently Asked Questions
                </h6>
                <h2 className="text-foreground-900 mb-2 text-center text-4xl leading-[3.25rem] font-bold lg:text-left">
                  Cari jawaban?
                </h2>
              </div>
              <div className="accordion">
                <Skeleton
                  className="w-full rounded-lg"
                  isLoaded={!isLoadingFaq}
                >
                  <Tabs variant="underlined">
                    <Tab key={"member"} title="Member">
                      <FaqMember dataFaq={dataFaq?.data} />
                    </Tab>
                    <Tab key={"organizer"} title="Organizer">
                      <FaqOrganizer dataFaq={dataFaq?.data} />
                    </Tab>
                  </Tabs>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewAboutFaq;
