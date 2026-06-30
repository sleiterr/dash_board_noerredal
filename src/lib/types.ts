export type EmployeeStatus = "present" | "absent" | "late" | "sick";

export type EventColor = "green" | "purple" | "blue" | "orange" | "rose";

export type Employee = {
  id: string;
  fullName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  color: EventColor;
  status: EmployeeStatus;
};
