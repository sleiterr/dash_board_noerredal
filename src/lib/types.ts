export type EmployeeStatus = "present" | "absent" | "late" | "sick";

export type EventColor = "green" | "purple" | "blue" | "orange" | "rose";

// interface for employee data
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

// interface for task data
export type Task = {
  id: string;
  employeeId: string | null;
  title: string;
  description: string | null;
  location: string | null;
  startAt: string; // ISO string
  endAt: string;
  allDay: boolean;
};
