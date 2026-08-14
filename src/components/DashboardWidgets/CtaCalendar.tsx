import { Plus, Check, X } from "lucide-react";

const CtaCalendar = () => {
  return (
    <>
      <button
        onClick={() => {}}
        className="w-6 h-6 bg-cta-link hover:bg-cta-modal-hover rounded-full flex items-center justify-center text-white transition-colors shadow-sm cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </>
  );
};

export default CtaCalendar;
