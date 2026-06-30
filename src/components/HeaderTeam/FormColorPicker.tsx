"use client";

import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  COLORS,
  COLOR_LABELS,
  EVENT_COLOR_DATA,
  type EventColor,
} from "@/lib/eventColors";

const FormColorPicker = ({ label, name, form }: FormColorPickerProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {label && (
        <label className="font-medium text-sm text-modal-text">{label}</label>
      )}
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div className="flex gap-2 mt-1">
            {COLORS.map((c) => {
              const cc = EVENT_COLOR_DATA[c];
              const isActive = field.value === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => field.onChange(c)}
                  title={COLOR_LABELS[c]}
                  className={clsx(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all cursor-pointer",
                    isActive
                      ? cc.bgClass
                      : "bg-white border-border-input hover:border-quaternary",
                  )}
                  style={isActive ? { borderColor: cc.accentColor } : {}}
                >
                  <div className={clsx("w-5 h-5 rounded-full", cc.avatarBg)} />
                  <span
                    className={clsx(
                      "text-[10px] font-medium",
                      isActive ? cc.textClass : "text-quaternary",
                    )}
                  >
                    {COLOR_LABELS[c]}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default FormColorPicker;

type FormColorPickerProps = {
  label?: string;
  name: string;
  form: UseFormReturn<any>;
};
