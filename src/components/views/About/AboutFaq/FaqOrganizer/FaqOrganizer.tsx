import { IFaq } from "@/types/Faq";
import { Accordion, AccordionItem } from "@heroui/react";

interface PropTyps {
  dataFaq: IFaq[];
}

const FaqOrganizer = (props: PropTyps) => {
  const { dataFaq } = props;

  return (
    <>
      <Accordion>
        {dataFaq
          ?.filter((item) => item?.type === "organizer")
          ?.map((item) => (
            <AccordionItem
              key={item?._id}
              subtitle={item?.type}
              title={item?.question}
            >
              {item?.answer}
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
};

export default FaqOrganizer;
