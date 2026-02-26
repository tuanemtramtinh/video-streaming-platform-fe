import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminNewSectionModal = ({ isOpen, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id="create_section_modal"
      ref={dialogRef}
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}

          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="text-color-primary mb-2 text-lg font-bold">
          Thêm chương
        </h3>
        <AdminCustomInput
          label="Tên chương"
          placeholder="Tên chương"
          style="mb-2 w-full"
        />
        <div className="flex justify-end">
          <button className="btn bg-text-fithdary rounded-lg text-white">
            Thêm
          </button>
        </div>
      </div>
    </dialog>
  );
};
