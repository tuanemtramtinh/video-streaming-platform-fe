import { useState } from "react";
import { AdminCustomInput } from "../AdminCustomInput";
import { AdminCustomSelect } from "../AdminCustomSelect";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FilePond, registerPlugin } from "react-filepond";
import { Editor } from "@tinymce/tinymce-react";
import { LessonType } from "@/types/lesson.type";
import { useCreateLesson } from "@/hooks/useCreateLesson";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loading";
import { useGetLessonDetail } from "@/hooks/useGetLessonDetail";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

export const LessonAdminGeneralInformation = ({
  isEdit = false,
}: {
  isEdit?: boolean;
}) => {
  const { sectionId, lessonId } = useParams();
  const navigate = useNavigate();

  const { mutate: createLesson, isPending } = useCreateLesson();

  const { data } = useGetLessonDetail(lessonId);

  console.log(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pondFiles, setPondFiles] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courseType, setCourseType] = useState<any>(LessonType.DOCUMENT);
  const [title, setTitle] = useState("");
  const [orderIndex, setOrderIndex] = useState("0");
  const [desc, setDesc] = useState("");

  const handleCreate = () => {
    const data = {
      sectionId: Number(sectionId),
      title,
      contentUrl: "",
      contentText: desc,
      lessonType: courseType,
      orderIndex: Number(orderIndex),
    };

    createLesson(data);

    navigate(`/admin/courses/47/sections/${sectionId}/lessons`);
  };

  return (
    <div>
      {isPending && <Loading />}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Đăng tải bài học</h2>
        <div className="flex gap-2">
          {isEdit && (
            <button className="btn btn-success text-white">Lưu</button>
          )}
          {isEdit && <button className="btn btn-error text-white">Xoá</button>}
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
          <FilePond
            name="thumbnail"
            className="filepond tw-filepond"
            allowMultiple={false}
            files={pondFiles}
            acceptedFileTypes={[
              "video/mp4",
              "video/quicktime", // MOV
            ]}
            onupdatefiles={(items) => {
              setPondFiles(items);
            }}
            labelIdle={`
                 <div class="flex flex-col items-center justify-center gap-2 w-full h-full py-8">
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                   
                   <div class="text-base font-semibold text-gray-900">
                     Drag and drop files, or <span class="filepond--label-action text-blue-500 hover:underline cursor-pointer">Browse</span>
                   </div>
                   
                   <div class="text-sm text-gray-400">
                     Upload Thumbnail in MOV, MP4.
                   </div>
                 </div>
               `}
          />
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
