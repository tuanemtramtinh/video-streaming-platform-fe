import { useDeleteCourse } from "@/hooks/useDeleteCourse";
import { CircleX } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
}

export const AdminDeleteCourseModal = ({
  id,
  isOpen,
  onClose,
  setLoading,
}: Props) => {
  const { mutate: deleteCourse } = useDeleteCourse();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDelete = () => {
    onClose();
    setLoading(true);
    deleteCourse(
      { id },
      {
        onSuccess: () => {
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
      id="create_section_modal"
      ref={dialogRef}
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}

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
              Xoá bài đăng
            </h2>
            <p className="text-text-secondary text-sm">
              Bạn có chắc chắn muốn xóa bài đăng này không? Hành động này không
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
