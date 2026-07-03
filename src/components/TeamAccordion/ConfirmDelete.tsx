import { STATUS_COLOR_DATA } from "@/lib/statusColors";
import { TriangleAlert } from "lucide-react";
import { Modal } from "../../components/Modal/Modal";
import ConfirmAction from "./ConfirmAction";
import { cn } from "@/lib/utils";

const ConfirmDelete = ({ employeeName, onConfirm, onClose }: ConfirmDelete) => {
  return (
    <Modal show={true} onClose={onClose} classDialogPanel="p-0! py-4! px-6!">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center my-auto">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl mb-4",
              STATUS_COLOR_DATA.absent.bgClass,
            )}
          >
            <TriangleAlert
              className={cn("h-7 w-7", STATUS_COLOR_DATA.absent.textClass)}
            />
          </div>
          <h4 className="font-bold text-xl text-modal-title mb-2">
            Delete Team Member
          </h4>
          <p className="font-normal text-sm text-center text-senary">
            Are you sure you want to remove{" "}
            <span className="font-bold">"{employeeName}"</span> from the team ?
            This will also delete all their calendar events.
          </p>
        </div>
        <ConfirmAction onCancel={onClose} onConfirm={onConfirm} />
      </div>
    </Modal>
  );
};

export default ConfirmDelete;

type ConfirmDelete = {
  employeeName: string;
  onConfirm: () => void;
  onClose: () => void;
};
