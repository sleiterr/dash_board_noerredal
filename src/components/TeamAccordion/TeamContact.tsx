import { Employee } from "@/lib/types";

import { Phone, Mail } from "lucide-react";

const TeamContact = ({ employee }: { employee: Employee }) => {
  return (
    <ul className="grid w-full grid-cols-3 items-center gap-4">
      <li className="flex items-center gap-2 justify-self-start">
        <Mail className="size-4 text-senary" />
        <a
          className="font-normal text-xs text-senary"
          href={`mailto:${employee.email}`}
        >
          {employee.email}
        </a>
      </li>
      <li className="flex items-center gap-2 justify-self-center">
        <Phone className="size-4 text-senary" />
        <a
          className="font-normal text-xs text-senary"
          href={`tel:${employee.phone}`}
        >
          {employee.phone}
        </a>
      </li>
    </ul>
  );
};

export default TeamContact;
