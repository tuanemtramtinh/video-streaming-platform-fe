import { useCheckoutCourse } from "@/hooks/useCheckoutCourse";
import { useEffect, useRef } from "react";
import { BookOpen } from "lucide-react";

interface Props {
  courseId: string;
  title: string;
  price: number;
  discount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseEnrollModal = ({
  courseId,
  title,
  price,
  discount,
  isOpen,
  onClose,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { mutate: checkout, isPending } = useCheckoutCourse();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const discountPrice = price * ((100 - discount) / 100);
  const finalPrice = discount > 0 ? discountPrice : price;

  const handleConfirm = () => {
    checkout(courseId);
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
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
          <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
            <BookOpen className="text-primary" />
          </div>

          <div>
            <h2 className="text-color-primary mb-2 text-lg font-semibold">
              Xác nhận đăng ký học
            </h2>
            <p className="text-text-secondary text-sm">
              Bạn có chắc chắn muốn đăng ký khoá học{" "}
              <span className="font-medium">{title}</span>?
            </p>
          </div>
        </div>

        <div className="divider" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-text-secondary font-bold">Học phí</p>
            {discount > 0 && (
              <span className="badge badge-success text-xs font-bold">
                Giảm {discount}%
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-color-primary text-xl font-bold">
                {finalPrice.toLocaleString()} VND
              </span>
              {discount > 0 && (
                <span className="text-sm line-through opacity-40">
                  {price.toLocaleString()} VND
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button className="btn btn-ghost rounded-lg" onClick={onClose}>
            Huỷ
          </button>
          <button
            className="btn btn-neutral rounded-lg"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
            Xác nhận đăng ký
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
