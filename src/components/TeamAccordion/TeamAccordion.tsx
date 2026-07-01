import type { Employee } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TeamAccordion = ({ employees }: TeamAccordionProps) => {
  return (
    <div className="p-4">
      <Accordion
        type="single"
        collapsible
        className="max-w-full w-full flex-col gap-4"
      >
        {employees.map((employee) => (
          <AccordionItem
            key={employee.id}
            value={employee.id}
            className="bg-white border-none rounded-2xl shadow-sm"
          >
            <AccordionTrigger className="py-3 px-4">
              {employee.fullName} — {employee.role}
            </AccordionTrigger>
            <AccordionContent className="border-t border-accordion-border p-4">
              {employee.email} · {employee.phone}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TeamAccordion;

type TeamAccordionProps = {
  employees: Employee[];
};
