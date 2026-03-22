import { useDeleteSection } from "@/hooks/useDeleteSection";
import { CircleX } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  sectionId: string;
  isOpen: boolean;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
}

export const AdminDeleteSectionModal = ({
  sectionId,
  isOpen,
  onClose,
  setLoading,
}: Props) => {
  const { mutate: deleteSection } = useDeleteSection();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDelete = () => {
    onClose();
    setLoading(true);
    deleteSection(
      { sectionId },
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id="delete_section_modal"
      ref={dialogRef}
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>

        <div className="flex gap-4">
          <div className="bg-error/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
            <CircleX className="text-error" />
          </div>

          <div>
            <h2 className="text-color-primary mb-2 text-lg font-semibold">
              Xoá chương
            </h2>
            <p className="text-text-secondary text-sm">
              Bạn có chắc chắn muốn xóa chương này không? Hành động này không
              thể hoàn tác.
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <button
            className="btn btn-error rounded-lg text-white"
            onClick={handleDelete}
          >
            Xoá
          </button>
        </div>
      </div>
    </dialog>
  );
};
