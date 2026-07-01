import HeaderTeam from "@/components/HeaderTeam/HeaderTeam";
import TeamAccordion from "@/components/TeamAccordion/TeamAccordion";
import { getEmployees } from "@/utils/api/employees";

const page = async () => {
  const empolyees = await getEmployees();

  return (
    <section>
      <HeaderTeam />
      <TeamAccordion employees={empolyees} />
    </section>
  );
};

export default page;
