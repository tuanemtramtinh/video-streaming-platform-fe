import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import { createDocumentUppy } from "@/utils/createVideoUppy";
import { useCreateResource } from "@/hooks/useCreateResource";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { useCourseStore } from "@/stores/useCourseStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}

export const AdminNewResourceModal = ({ isOpen, onClose, courseId }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const currentCourse = useCourseStore((state) => state.currentCourse);

  const [uppy] = useState(() => createDocumentUppy());
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLessonIds, setSelectedLessonIds] = useState<Set<number>>(
    new Set(),
  );

  const { mutate: createResource, isPending } = useCreateResource();

  const isLoading = isUploading || isPending;

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Vui lòng nhập tên tài liệu");
      return;
    }

    setIsUploading(true);
    const result = await uppy.upload();
    setIsUploading(false);

    if (
      !result ||
      !result.failed ||
      !result.successful ||
      result.failed.length > 0 ||
      result.successful.length === 0
    ) {
      toast.error(result?.failed?.[0]?.error ?? "Tải tài liệu thất bại");
      return;
    }

    const uploaded = result.successful[0];
    const fileUrl = uploaded.uploadURL ?? "";
    const fileType = uploaded.type;

    const lessonIds = [...selectedLessonIds];

    createResource(
      { courseId, title, fileUrl, fileType, lessonIds },
      {
        onSuccess: () => {
          setTitle("");
          setSelectedLessonIds(new Set());
          uppy.cancelAll();
          onClose();
        },
      },
    );
  };

  return (
    <dialog
      id="create_resource_modal"
      ref={dialogRef}
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box max-w-5xl">
        {isLoading && <Loading />}
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="text-color-primary mb-4 text-lg font-bold">
          Thêm tài liệu
        </h3>

        <AdminCustomInput
          label="Tên tài liệu"
          placeholder="Tên tài liệu"
          style="mb-4 w-full"
          required
          value={title}
          setValue={setTitle}
        />

        <div className="dropdown z-99 w-full">
          <div
            tabIndex={0}
            role="button"
            className="btn mb-2 w-full items-center justify-between bg-white"
          >
            Chọn bài học
            <ChevronDown />
          </div>
          <div
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-box border-border max-h-80 w-full overflow-y-auto border shadow"
          >
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

              {/* Chương 1 */}
              {/* <div className="mb-3">
                <p className="px-2 py-1 font-semibold">Chương 1 - abc</p>
                <div className="space-y-1">
                  {["abcd 1", "abcd 2", "abcd 3"].map((item, i) => (
                    <label
                      key={i}
                      className="hover:bg-base-200 flex cursor-pointer items-center justify-between rounded px-3 py-2"
                    >
                      <span>{item}</span>
                      <input type="checkbox" className="checkbox checkbox-sm" />
                    </label>
                  ))}
                </div>
              </div> */}

              {/* Chương 2
              <div>
                <p className="px-2 py-1 font-semibold">Chương 2 - abc</p>
                <div className="space-y-1">
                  {["abcd 4", "abcd 5", "abcd 6"].map((item, i) => (
                    <label
                      key={i}
                      className="hover:bg-base-200 flex cursor-pointer items-center justify-between rounded px-3 py-2"
                    >
                      <span>{item}</span>
                      <input type="checkbox" className="checkbox checkbox-sm" />
                    </label>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="relative z-30 mb-6">
          <h2 className="text-text-secondary mb-2 text-sm">
            File tài liệu <span className="text-error">*</span>
          </h2>
          <Dashboard uppy={uppy} width="100%" height={350} hideUploadButton />
        </div>

        <div className="flex justify-end">
          <button
            className="btn bg-text-fithdary rounded-lg text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Thêm
          </button>
        </div>
      </div>
    </dialog>
  );
};
