import { Pencil, Trash2 } from "lucide-react";

const EventBtn = ({ setIsOpen, onEditClick }: EventBtnProps) => {
  return (
    <>
      <button
        onClick={onEditClick}
        className="flex items-center gap-1 text-xs text-accordion-role hover:text-accordion-title cursor-pointer transition duration-200 ease-in-out hover:scale-105"
      >
        <Pencil className="h-3.5 w-3.5" />
        <span>Edit</span>
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 cursor-pointer text-xs text-accordion-role hover:text-red-600 transition duration-200 ease-in-out hover:scale-105"
      >
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </>
  );
};

export default EventBtn;

type EventBtnProps = {
  onEditClick?: () => void;
  setIsOpen: (isOpen: boolean) => void;
};
