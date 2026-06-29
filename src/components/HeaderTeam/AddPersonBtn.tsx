"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { UserPlus } from "lucide-react";

const AddPersonBtn = ({ setIsOpen }: AddPersonBtnProps) => {
  return (
    <>
      <div className="">
        <button
          onClick={() => setIsOpen(true)}
          className={clsx(
            "font-normal text-xs text-white",
            "flex items-center gap-2 px-4 py-2 rounded-full shadow-md bg-cta-modal cursor-pointer",
            "hover:bg-cta-modal-hover transition-all duration-300",
          )}
        >
          <UserPlus className="h-4 w-4 text-white" />
          Add Person
        </button>
      </div>
    </>
  );
};

export default AddPersonBtn;

type AddPersonBtnProps = {
  setIsOpen: (value: boolean) => void;
};
