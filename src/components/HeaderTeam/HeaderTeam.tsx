"use client";

import React, { useState } from "react";
import AddPersonBtn from "./AddPersonBtn";
import ModalAddPerson from "./ModalAddPerson";
import { format } from "date-fns";

const HeaderTeam = () => {
  const [islOpen, setIsOpen] = useState(false);
  const today = new Date();

  return (
    <>
      <header className="h-full flex flex-col overflow-hidden">
        <div className="bg-white border-b border-header-border px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h4 className="font-semibold text-base text-team-title">
                Team Attendance
              </h4>
              <p className="font-normal text-xs text-quaternary mt-0.5">
                {format(today, "EEEE, MMMM d, yyyy")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <AddPersonBtn setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
        {islOpen && <ModalAddPerson onClose={() => setIsOpen(false)} />}
      </header>
    </>
  );
};

export default HeaderTeam;
