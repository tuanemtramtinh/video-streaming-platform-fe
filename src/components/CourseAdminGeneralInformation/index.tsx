import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Editor } from "@tinymce/tinymce-react";
import { AdminCustomInput } from "@/components/AdminCustomInput";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CourseAdminGeneralInformation = ({
  isEdit = false,
}: {
  isEdit: boolean;
}) => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="text-color-primary text-lg font-semibold">Chi tiết</div>
        <div className="flex gap-2">
          <button className="btn bg-text-secondary rounded-lg text-white">
            Nháp
          </button>
          {!isEdit && (
            <button className="btn btn-success rounded-lg text-white">
              Tạo
            </button>
          )}
          {isEdit && (
            <>
              <button className="btn btn-success rounded-lg text-white">
                Lưu
              </button>
              <button className="btn btn-info rounded-lg text-white">
                Khôi phục
              </button>
              <button className="btn btn-error rounded-lg text-white">
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
          />
          <AdminCustomInput
            label="Mô tả ngắn"
            placeholder="Mô tả ngắn..."
            required
            style="mb-6"
          />
          <div className="mb-6">
            <h2 className="text-text-secondary mb-2 text-sm">
              Ảnh đại diện Khóa học <span className="text-error">*</span>
            </h2>
            <FilePond
              name="thumbnail"
              className="filepond tw-filepond"
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
            <Editor apiKey={import.meta.env.VITE_TINYMCE_API_KEY} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AdminCustomInput
            label="Giá khoá học"
            placeholder="Giá khoá học..."
          />
          <AdminCustomInput label="% Giảm giá" placeholder="% Giảm giá..." />
        </div>
      </div>
    </div>
  );
};
