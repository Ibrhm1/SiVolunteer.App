import { IFaq } from "@/types/Faq";
import { Accordion, AccordionItem } from "@heroui/react";

interface PropTyps {
  dataFaq: IFaq[];
}

const FaqMember = (props: PropTyps) => {
  const { dataFaq } = props;

  return (
    <>
      <Accordion>
        {dataFaq
          ?.filter((item) => item?.type === "member")
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

export default FaqMember;
