import { Modal } from "@/components/Modal/Modal";
import { FormEvent } from "./FormEvent";

const ModalNewEvent = ({ onClose }: ConfirmDeleteModalProps) => {
  return (
    <Modal show={true} onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <div className="">
          <h4 className="font-medium text-lg text-modal-title">
            Add New Event
          </h4>
        </div>
        <div className="">
          <button
            onClick={onClose}
            className=" text-lg font-bold cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-modal-icon-close w-8 h-8 hover:text-stone-700 transition-colors duration-300"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="self-start mb-2">
          <p className="font-normal text-sm text-modal-text">Assign to</p>
        </div>
        <div>
          <FormEvent />
        </div>
      </div>
    </Modal>
  );
};

export default ModalNewEvent;

type ConfirmDeleteModalProps = {
  onClose: () => void;
};
