import clsx from "clsx";
import type { Employee } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import TeamContact from "./TeamContact";
import StatusFilter from "./StatusFilter";

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
            <AccordionTrigger
              className={clsx(
                "flex py-3 px-4",
                "**:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-accordion-chevron **:data-[slot=accordion-trigger-icon]:cursor-pointer",
              )}
            >
              <div className="">
                <div className="">
                  <h4 className="font-semibold text-sm text-accordion-title">
                    {employee.fullName}
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-normal text-xs text-accordion-role">
                    {employee.role}
                  </p>
                  <span className="acc-dot">·</span>
                  <span className="font-normal text-xs text-accordion-role">
                    {employee.location}
                  </span>
                </div>
              </div>
              <div className="">
                <StatusFilter employee={employee} />
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-accordion-border px-4 pt-4 pb-4">
              <TeamContact employee={employee} />
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
