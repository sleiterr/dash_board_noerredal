import { Modal } from "@/components/Modal/Modal";
import { FormPerson } from "./FormPerson";

const ModalAddPerson = ({ onClose }: ConfirmDeleteModalProps) => {
  return (
    <Modal show={true} onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col items-start">
          <h4 className="font-medium text-lg text-modal-title">New Person</h4>
          <p className="font-normal text-sm text-modal-text">Medarbejdere</p>
        </div>
        <div className="self-start">
          <button
            onClick={onClose}
            className="font-bold text-lg cursor-pointer"
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
              className="text-modal-icon-close w-6 h-6 hover:text-stone-700 transition-colors duration-300"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <FormPerson onClose={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddPerson;

type ConfirmDeleteModalProps = {
  onClose: () => void;
};
