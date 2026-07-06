"use client";

import type { Employee } from "@/lib/types";
import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";

type EmployeePickerProps = {
  employees: Employee[];
  value: string | null;
  onChange: (id: string | null) => void;
};

const EmployeePicker = ({
  employees,
  value,
  onChange,
}: EmployeePickerProps) => {
  const selectedEmployee = employees.find((e) => e.id === value) ?? null;
  const colors = selectedEmployee
    ? EVENT_COLOR_DATA[selectedEmployee.color]
    : null;

  return (
    <div>
      <label className="font-normal text-sm text-modal-text mb-1.5 block">
        Assign to
      </label>
      <div className="flex gap-2 flex-wrap">
        {employees.map((emp) => {
          const ec = EVENT_COLOR_DATA[emp.color];
          const isActive = emp.id === value;
          return (
            <button
              key={emp.id}
              type="button"
              onClick={() => onChange(isActive ? null : emp.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 transition-all text-xs font-medium cursor-pointer ${
                isActive
                  ? `${ec.bgClass} ${ec.textClass} border-transparent shadow-sm`
                  : "bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${ec.avatarBg} ${ec.avatarText}`}
              >
                {getInitials(emp.fullName)}
              </div>
              {emp.fullName.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {selectedEmployee && colors && (
        <div
          className={`mt-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${colors.lightBg}`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${colors.dotClass}`} />
          <span className={`text-xs ${colors.textClass}`}>
            Events will appear in{" "}
            <strong>{selectedEmployee.fullName.split(" ")[0]}</strong>
            &apos;s color
          </span>
        </div>
      )}
    </div>
  );
};

export default EmployeePicker;
