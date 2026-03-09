import { useDeleteLesson } from "@/hooks/useDeleteLesson";
import { CircleX } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
}

export const AdminDeleteLessonModal = ({
  id,
  isOpen,
  onClose,
  setLoading,
}: Props) => {
  const { mutate: deleteLesson } = useDeleteLesson();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDelete = () => {
    onClose();
    setLoading(true);
    deleteLesson(
      { id },
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
      id="delete_lesson_modal"
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
              Xoá bài học
            </h2>
            <p className="text-text-secondary text-sm">
              Bạn có chắc chắn muốn xóa bài học này không? Hành động này không
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
