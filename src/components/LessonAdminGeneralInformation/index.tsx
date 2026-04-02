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
import { useProcessVideo } from "@/hooks/useProcessVideo";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
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
  const { mutate: processVideo } = useProcessVideo();

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

  const isOpenDashboard = !isEdit || (isEdit && data && !data.contentUrl);

  const handleCreate = async () => {
    if (title === "" || desc === "" || orderIndex === "") {
      toast.error("Vui lòng nhập đầy đủ các trường");
      return;
    }

    const result = await uppy.upload();

    if (
      !result ||
      !result.failed ||
      !result.successful ||
      result.failed.length > 0 ||
      result.successful.length === 0
    ) {
      const errorMessage = result?.failed?.[0]?.error ?? "Tải video thất bại";
      toast.error(errorMessage);
      return;
    }

    const contentUrl = result.successful[0].uploadURL ?? "";

    createLesson(
      {
        sectionId: Number(sectionId),
        title,
        contentUrl,
        contentText: desc,
        lessonType: courseType,
        orderIndex: Number(orderIndex),
      },
      {
        onSuccess: (data) => {
          processVideo({ lessonId: data.id });
          navigate(`/admin/courses/${id}/sections/${sectionId}/lessons`);
        },
      },
    );
  };

  const handleUpdate = async () => {
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

    let contentUrl = undefined;
    if (isOpenDashboard) {
      const result = await uppy.upload();

      if (
        !result ||
        !result.failed ||
        !result.successful ||
        result.failed.length > 0 ||
        result.successful.length === 0
      ) {
        const errorMessage = result?.failed?.[0]?.error ?? "Tải video thất bại";
        toast.error(errorMessage);
        return;
      }

      contentUrl = result.successful[0].uploadURL ?? "";
    }

    updatedData.contentUrl = contentUrl;

    updateLesson({
      lessonId: lessonId as string,
      title: updatedData.title,
      orderIndex: updatedData.orderIndex
        ? Number(updatedData.orderIndex)
        : undefined,
      lessonType: updatedData.lessonType,
      contentText: updatedData.contentText,
      contentUrl: updatedData.contentUrl,
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
              disabled={isPendingUpdate}
            >
              Lưu
            </button>
          )}
          {isEdit && (
            <button
              className="btn btn-error text-white"
              disabled={isPendingUpdate}
              onClick={handleDelete}
            >
              Xoá
            </button>
          )}
          {!isEdit && (
            <button
              className="btn btn-info text-white"
              disabled={isPending}
              onClick={handleCreate}
            >
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
          disabled={isPending || isPendingUpdate}
        />
        <AdminCustomInput
          label="Thứ tự bài học"
          placeholder="Thứ tự bài học..."
          required={true}
          value={orderIndex}
          setValue={setOrderIndex}
          disabled={isPending || isPendingUpdate}
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
          disabled={isPending || isPendingUpdate}
          required={true}
        />
        <div className="">
          <h2 className="text-text-secondary mb-2 text-sm">
            Tải video bài học <span className="text-error">*</span>
          </h2>

          <div className="min-w-0">
            {isOpenDashboard ? (
              <>
                <p className="text-text-secondary mb-2 text-sm">Tải lên</p>
                <Dashboard
                  uppy={uppy}
                  width={"100%"}
                  height={400}
                  hideUploadButton
                />
              </>
            ) : (
              <div>
                <MediaPlayer title="" crossOrigin src={data?.contentUrl}>
                  <MediaProvider />
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              </div>
            )}
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
            disabled={isPending || isPendingUpdate}
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
