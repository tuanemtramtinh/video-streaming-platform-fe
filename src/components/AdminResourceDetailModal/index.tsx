import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useGetLessonsByResourceId } from "@/hooks/useGetLessonsByResourceId";
import { useLinkLessonsToResource } from "@/hooks/useLinkLessonsToResource";
import type { IResource } from "@/types/resources.type";
import { useEffect, useRef, useState } from "react";
import { useCourseStore } from "@/stores/useCourseStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resource: IResource | null;
}

export const AdminResourceDetailModal = ({
  isOpen,
  onClose,
  resource,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentCourse = useCourseStore((state) => state.currentCourse);

  const { data: linkedLessons = [] } = useGetLessonsByResourceId(
    resource?.id ?? 0,
  );

  const [selectedLessonIds, setSelectedLessonIds] = useState<Set<number>>(
    new Set(),
  );
  const [title, setTitle] = useState("");

  const { mutate: linkLessons, isPending } = useLinkLessonsToResource();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedLessonIds(new Set(linkedLessons.map((l) => l.lessonId)));
  }, [linkedLessons]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(resource?.title ?? "");
  }, [resource]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleUpdate = () => {
    if (!resource) return;
    linkLessons({
      resourceId: resource.id,
      title,
      lessonIds: [...selectedLessonIds],
    });
  };

  return (
    <dialog
      id="resource_detail_modal"
      ref={dialogRef}
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box flex h-[60vh] max-w-5xl flex-col gap-4">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="text-color-primary text-lg font-bold">
          Chi tiết tài liệu
        </h3>

        <AdminCustomInput
          label="Tên tài liệu"
          placeholder="Tên tài liệu"
          style="w-full"
          value={title}
          setValue={setTitle}
        />

        <div className="flex-1 overflow-y-auto">
          <p className="text-text-secondary mb-2 text-sm font-medium">
            Bài học liên kết
          </p>
          <div className="border-border rounded-box border bg-white">
            <div className="p-2">
              {(currentCourse?.sections ?? []).map((section) => (
                <div className="mb-3" key={section.id}>
                  <p className="px-2 py-1 font-semibold">{section.title}</p>
                  <div className="space-y-1">
                    {section.lessons.map((lesson) => (
                      <label
                        key={lesson.id}
                        className="hover:bg-base-200 flex cursor-pointer items-center justify-between rounded px-3 py-2"
                      >
                        <span>{lesson.title}</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={selectedLessonIds.has(lesson.id)}
                          onChange={(e) =>
                            setSelectedLessonIds((prev) => {
                              const next = new Set(prev);
                              if (e.target.checked) {
                                next.add(lesson.id);
                              } else {
                                next.delete(lesson.id);
                              }
                              return next;
                            })
                          }
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <a
            href={resource?.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info text-white"
          >
            Xem trước
          </a>
          <a
            href={resource?.fileUrl}
            download
            className="btn btn-success text-white"
          >
            Tải về
          </a>
          <button
            className="btn btn-primary text-white"
            onClick={handleUpdate}
            disabled={isPending}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </dialog>
  );
};
