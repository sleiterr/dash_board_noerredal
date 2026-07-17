import { Modal } from "../../components/Modal/Modal";
import ConfirmAction from "@/components/TeamAccordion/ConfirmAction";

const ConfirmEventDelete = ({
  eventTitle,
  onConfirm,
  onClose,
}: ConfirmEventDelete) => {
  return (
    <Modal show={true} onClose={onClose} classDialogPanel="p-0! py-4! px-6!">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center my-auto">
          <h4 className="font-bold text-xl text-modal-title mb-2">
            Delete Event
          </h4>
          <p className="font-normal text-sm text-center text-senary">
            Are you sure you want to delete the event "{eventTitle}"? This
            action cannot be undone.
          </p>
        </div>
        <ConfirmAction onCancel={onClose} onConfirm={onConfirm} />
      </div>
    </Modal>
  );
};

export default ConfirmEventDelete;

type ConfirmEventDelete = {
  eventTitle: string;
  onConfirm: () => void;
  onClose: () => void;
};
