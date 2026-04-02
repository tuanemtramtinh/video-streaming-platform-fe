import { useEffect, useState } from "react";
import { AdminCustomInput } from "../AdminCustomInput";
import { AdminCustomSelect } from "../AdminCustomSelect";
import { Editor } from "@tinymce/tinymce-react";
import { LessonType, type ILesson } from "@/types/lesson.type";
import { useCreateLesson } from "@/hooks/useCreateLesson";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loading";
import { useGetLessonDetail } from "@/hooks/useGetLessonDetail";
import { useUpdateLesson } from "@/hooks/useUpdateLesson";
import { AdminDeleteLessonModal } from "@/components/AdminDeleteLessonModal";
import { toast } from "react-toastify";
import { createMultipartUppy } from "@/utils/createVideoUppy";
import Dashboard from "@uppy/react/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

export const LessonAdminGeneralInformation = ({
  isEdit = false,
}: {
  isEdit?: boolean;
}) => {
  const { id, sectionId, lessonId } = useParams();
  const navigate = useNavigate();

  const { mutate: createLesson, isPending } = useCreateLesson();
  const { mutate: updateLesson, isPending: isPendingUpdate } =
    useUpdateLesson();

  const { data, isSuccess } = useGetLessonDetail(lessonId);

  const [uppy] = useState(() => createMultipartUppy());

  const [initialData, setInitialData] = useState<ILesson | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courseType, setCourseType] = useState<any>(LessonType.DOCUMENT);
  const [title, setTitle] = useState("");
  const [orderIndex, setOrderIndex] = useState("0");
  const [desc, setDesc] = useState("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleCreate = () => {
    if (title === "" || desc === "" || orderIndex === "") {
      toast.error("Vui lòng nhập đầy đủ các trường");
      return;
    }

    const data = {
      sectionId: Number(sectionId),
      title,
      contentUrl: "",
      contentText: desc,
      lessonType: courseType,
      orderIndex: Number(orderIndex),
    };

    createLesson(data, {
      onSuccess: () => {
        navigate(`/admin/courses/${id}/sections/${sectionId}/lessons`);
      },
    });
  };

  const handleUpdate = () => {
    if (!initialData) return;

    const updatedData: Partial<ILesson> = {};

    if (title && initialData.title !== title) {
      updatedData.title = title;
    }

    if (orderIndex && String(initialData.orderIndex) !== orderIndex) {
      updatedData.orderIndex = Number(orderIndex);
    }

    if (courseType && initialData.lessonType !== courseType) {
      updatedData.lessonType = courseType;
    }

    if (desc && initialData.contentText !== desc) {
      updatedData.contentText = desc;
    }

    updateLesson({
      lessonId: lessonId as string,
      title: updatedData.title,
      orderIndex: updatedData.orderIndex
        ? Number(updatedData.orderIndex)
        : undefined,
      lessonType: updatedData.lessonType,
      contentText: updatedData.contentText,
    });
  };

  const handleDelete = () => {
    setIsOpenDelete(true);
  };

  useEffect(() => {
    if (data && isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialData(data);
      setTitle(data.title);
      setOrderIndex(String(data.orderIndex));
      setCourseType(data.lessonType);
      setDesc(data.contentText);
    }
  }, [data, isSuccess]);

  return (
    <div>
      {(isPending || isPendingUpdate || isLoadingDelete) && <Loading />}
      {isEdit && lessonId && (
        <AdminDeleteLessonModal
          id={lessonId}
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          setLoading={setIsLoadingDelete}
        />
      )}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Đăng tải bài học</h2>
        <div className="flex gap-2">
          {isEdit && (
            <button
              className="btn btn-success text-white"
              onClick={handleUpdate}
            >
              Lưu
            </button>
          )}
          {isEdit && (
            <button className="btn btn-error text-white" onClick={handleDelete}>
              Xoá
            </button>
          )}
          {!isEdit && (
            <button className="btn btn-info text-white" onClick={handleCreate}>
              Tạo bài học mới
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AdminCustomInput
          label="Tiêu đề"
          placeholder="Tiêu đề..."
          required={true}
          value={title}
          setValue={setTitle}
        />
        <AdminCustomInput
          label="Thứ tự bài học"
          placeholder="Thứ tự bài học..."
          required={true}
          value={orderIndex}
          setValue={setOrderIndex}
        />
        <AdminCustomSelect
          label="Loại khoá học"
          value={courseType}
          setValue={setCourseType}
          options={[
            { label: "Video", value: LessonType.VIDEO },
            { label: "Document", value: LessonType.DOCUMENT },
            { label: "Quiz", value: LessonType.QUIZ },
          ]}
          required={true}
        />
        <div className="">
          <h2 className="text-text-secondary mb-2 text-sm">
            Tải video bài học <span className="text-error">*</span>
          </h2>

          <div className="min-w-0">
            <p className="text-text-secondary mb-2 text-sm">Tải lên</p>
            <Dashboard
              uppy={uppy}
              width={"100%"}
              height={400}
              hideUploadButton
            />
          </div>
          {/* Cột "Xem trước" (video player) tạm tắt — bật lại cùng state videoPlaybackUrl + grid 2 cột */}
        </div>
        <div>
          <h2 className="text-text-secondary mb-2 text-sm">
            Mô tả Khoá học <span className="text-error">*</span>
          </h2>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={desc}
            onEditorChange={(newValue) => setDesc(newValue)}
            init={{
              plugins: ["lists", "link", "image", "table", "code"],

              toolbar:
                "undo redo | blocks | bold italic | bullist numlist | alignleft aligncenter alignright | indent outdent | code",
            }}
          />
        </div>
      </div>
    </div>
  );
};
