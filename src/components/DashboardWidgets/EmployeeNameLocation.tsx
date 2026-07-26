import type { Employee } from "@/lib/types";

function getFirstName(fullName: string): string {
  // Split the full name by whitespace and return the first part (first name)
  // use the (regex) /\s+/ to split by any whitespace character (space, tab, etc.)
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

const EmployeeNameLocation = ({ employee }: { employee: Employee }) => {
  return (
    <div className="flex flex-col items-start justify-center flex-1 min-w-0">
      <h4 className="font-semibold text-xs text-team-title">
        {getFirstName(employee.fullName)}
      </h4>
      <span className="font-normal text-[10px] text-accordion-role">
        {employee.location}
      </span>
    </div>
  );
};

export default EmployeeNameLocation;
