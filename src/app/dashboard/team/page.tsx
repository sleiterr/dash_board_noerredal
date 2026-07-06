import HeaderTeam from "@/components/HeaderTeam/HeaderTeam";
import TeamAccordion from "@/components/TeamAccordion/TeamAccordion";
import { getEmployees } from "@/utils/api/employees";

const page = async () => {
  const employees = await getEmployees();

  return (
    <section>
      <HeaderTeam employees={employees} />
      <TeamAccordion employees={employees} />
    </section>
  );
};

export default page;
