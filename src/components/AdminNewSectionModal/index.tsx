import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useCreateSection } from "@/hooks/useCreateSection";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loading";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminNewSectionModal = ({ isOpen, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { id } = useParams();

  const [orderIndex, setOrderIndex] = useState("0");
  const [title, setTitle] = useState("");

  const { mutate: createSection, isPending } = useCreateSection(Number(id));

  const handleCreate = () => {
    if (orderIndex === "" || title === "") {
      onClose();
      toast.error("Vui lòng nhập đầy đủ các trường");
      return;
    }

    createSection({
      courseId: Number(id),
      title,
      orderIndex: Number(orderIndex),
    });

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {isPending && <Loading />}
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
            label="Thứ tự chương"
            placeholder="Thứ tự chương"
            style="mb-2 w-full"
            value={orderIndex}
            setValue={setOrderIndex}
            type="number"
          />
          <AdminCustomInput
            label="Tên chương"
            placeholder="Tên chương"
            style="mb-2 w-full"
            value={title}
            setValue={setTitle}
          />
          <div className="flex justify-end">
            <button
              className="btn bg-text-fithdary rounded-lg text-white"
              onClick={handleCreate}
            >
              Thêm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
