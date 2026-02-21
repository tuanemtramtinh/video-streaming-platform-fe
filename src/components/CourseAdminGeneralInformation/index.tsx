import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Editor } from "@tinymce/tinymce-react";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CourseAdminGeneralInformation = () => {
  return (
    <div>
      <div className="flex gap-6">
        <div className="flex-3">
          <input
            type="text"
            placeholder="Tên khoá học"
            className="input mb-6 w-full"
          />
          <div className="mb-6">
            <h2>Đăng ảnh thumbnail khoá học</h2>
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

          <Editor apiKey={import.meta.env.VITE_TINYMCE_API_KEY} />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Giá khoá học"
          />
          <select defaultValue="Ngôn ngữ" className="select w-full">
            <option disabled={true}>Ngôn ngữ</option>
            <option>English</option>
            <option>Vietnamese</option>
          </select>
          <select defaultValue="Phụ đề" className="select w-full">
            <option disabled={true}>Phụ đề</option>
            <option>English</option>
            <option>Spanish</option>
          </select>
          <select defaultValue="Cấp độ" className="select w-full">
            <option disabled={true}>Cấp độ</option>
            <option>Người mới</option>
            <option>Trung bình</option>
            <option>Nâng cao</option>
          </select>
        </div>
      </div>
    </div>
  );
};
