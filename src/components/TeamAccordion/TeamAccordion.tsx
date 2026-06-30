import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TeamAccordion = () => {
  return (
    <div className="p-4">
      <Accordion
        type="single"
        collapsible
        defaultValue="shipping"
        className="max-w-full w-full flex-col gap-4"
      >
        <AccordionItem
          className="bg-white border-none rounded-2xl shadow-sm"
          value="shipping"
        >
          <AccordionTrigger className="py-3 px-4">
            What are your shipping options?
          </AccordionTrigger>
          <AccordionContent className="border-t border-accordion-border p-4">
            We offer standard (5-7 days), express (2-3 days), and overnight
            shipping. Free shipping on international orders.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-white border-amber-600" value="returns">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            Returns accepted within 30 days. Items must be unused and in
            original packaging. Refunds processed within 5-7 business days.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>
            How can I contact customer support?
          </AccordionTrigger>
          <AccordionContent>
            Reach us via email, live chat, or phone. We respond within 24 hours
            during business days.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TeamAccordion;
