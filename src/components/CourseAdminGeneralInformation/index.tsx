import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Editor } from "@tinymce/tinymce-react";
import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useCreateCourse } from "@/hooks/useCreateCourse";
import { useNavigate, useParams } from "react-router";
import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";
import type { ICourse } from "@/types/course.type";
import type { UpdateCoursePayload } from "@/services/courses.service";
import { useUpdateCourse } from "@/hooks/useUpdateCourse";
import { AdminDeleteCourseModal } from "@/components/AdminDeleteCourseModal";
import { toast } from "react-toastify";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CourseAdminGeneralInformation = ({
  isEdit = false,
}: {
  isEdit: boolean;
}) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<ICourse | null>(null);
  const [courseName, setCourseName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [smallDesc, setSmallDesc] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pondFiles, setPondFiles] = useState<any[]>([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { data, isSuccess } = useGetCourseDetail(isEdit ? id : undefined);

  const { mutate: createCourse, isPending } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdatePending } =
    useUpdateCourse();

  const handleSubmit = () => {
    if (!courseName || !desc || pondFiles.length === 0 || !price || !discount) {
      toast.error("Vui lòng điền đầy đủ các trường");
      return;
    }

    const fileItem = pondFiles[0];
    const thumbnail = fileItem.file;

    createCourse(
      {
        title: courseName,
        description: desc,
        thumbnail: thumbnail as File,
        price: price,
        discount: discount === "" ? "0" : discount,
        categoryId: "3",
      },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/admin/courses");
        },
      },
    );
  };

  const handleUpdate = () => {
    if (!initialData) return;
    const payload: UpdateCoursePayload = {
      id: id as string,
    };

    if (courseName !== initialData.title) {
      payload.title = courseName;
    }

    if (desc !== initialData.description) {
      payload.description = desc;
    }

    if (price !== initialData.price.toString()) {
      payload.price = price;
    }

    if (discount !== initialData.discount.toString()) {
      payload.discount = discount;
    }

    const fileItem = pondFiles[0];

    if (fileItem?.file instanceof File) {
      payload.thumbnail = fileItem.file;
    }

    updateCourse(payload);
  };

  const handleDelete = () => {
    setIsOpenDelete(true);
  };

  useEffect(() => {
    if (data && isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialData(data);
      setCourseName(data.title);
      setDesc(data.description);
      setPrice(data.price.toString());
      setDiscount(data.discount.toString());
      setPondFiles([
        {
          source: data.thumbnailUrl,
          options: {
            type: "remote",
          },
        },
      ]);
    }
  }, [data, isSuccess]);

  return (
    <div>
      {(isPending || isUpdatePending || isLoadingDelete) && <Loading />}
      {isEdit && (
        <AdminDeleteCourseModal
          id={id as string}
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          setLoading={setIsLoadingDelete}
        />
      )}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-color-primary text-lg font-semibold">Chi tiết</div>
        <div className="flex gap-2">
          {/* <button className="btn bg-text-secondary rounded-lg text-white">
            Nháp
          </button> */}
          {!isEdit && (
            <button
              className="btn btn-success rounded-lg text-white"
              onClick={handleSubmit}
            >
              Tạo
            </button>
          )}
          {isEdit && (
            <>
              <button
                className="btn btn-success rounded-lg text-white"
                onClick={handleUpdate}
              >
                Lưu
              </button>
              <button className="btn btn-info rounded-lg text-white">
                Khôi phục
              </button>
              <button
                className="btn btn-error rounded-lg text-white"
                onClick={handleDelete}
              >
                Xoá
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex-3">
          <h2 className="text-color-primary mb-4 text-xl font-semibold">
            Chi tiết khoá học
          </h2>
          <AdminCustomInput
            label="Tên khoá học"
            placeholder="Tên khoá học..."
            required
            style="mb-6"
            value={courseName}
            setValue={setCourseName}
          />
          <AdminCustomInput
            label="Mô tả ngắn"
            placeholder="Mô tả ngắn..."
            required
            style="mb-6"
            value={smallDesc}
            setValue={setSmallDesc}
          />
          <div className="mb-6">
            <h2 className="text-text-secondary mb-2 text-sm">
              Ảnh đại diện Khóa học <span className="text-error">*</span>
            </h2>
            <FilePond
              name="thumbnail"
              className="filepond tw-filepond"
              allowMultiple={false}
              files={pondFiles}
              onupdatefiles={(items) => {
                setPondFiles(items);

                // Nếu user chọn file mới → lấy File
                // const file = (items[0]?.file as File) ?? null;
                // setThumbnail(file);
              }}
              labelIdle={`
                 <div class="flex flex-col items-center justify-center gap-2 w-full h-full py-8">
                   <svg class="text-gray-800 mb-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/>
                     <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                     <circle cx="9" cy="9" r="2"/>
                     <path d="M19 3v6"/>
                     <path d="M16 6h6"/>
                   </svg>
                   
                   <div class="text-base font-semibold text-gray-900">
                     Drag and drop files, or <span class="filepond--label-action text-blue-500 hover:underline cursor-pointer">Browse</span>
                   </div>
                   
                   <div class="text-sm text-gray-400">
                     Upload Thumbnail in JPEG, PNG.
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
        <div className="flex flex-1 flex-col gap-4">
          <AdminCustomInput
            label="Giá khoá học"
            placeholder="Giá khoá học..."
            required={true}
            value={price}
            setValue={setPrice}
          />
          <AdminCustomInput
            label="% Giảm giá"
            placeholder="% Giảm giá..."
            required={true}
            value={discount}
            setValue={setDiscount}
          />
        </div>
      </div>
    </div>
  );
};
