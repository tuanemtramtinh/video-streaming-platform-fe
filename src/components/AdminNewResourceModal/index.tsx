import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useEffect, useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ChevronDown } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const AdminNewResourceModal = ({ isOpen, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id="create_section_modal"
      ref={dialogRef}
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}

          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="text-color-primary mb-2 text-lg font-bold">
          Thêm chương
        </h3>
        <AdminCustomInput
          label="Tên chương"
          placeholder="Tên chương"
          style="mb-2 w-full"
          required={true}
        />
        <div className="dropdown w-full">
          {/* <label
            tabIndex={0}
            className="input input-bordered flex w-full cursor-pointer items-center"
          >
            Chọn bài học
          </label> */}
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
            className="dropdown-content bg-base-100 rounded-box border-border z-50 max-h-80 w-full overflow-y-auto border shadow"
          >
            <div className="p-2">
              {/* Chương 1 */}
              <div className="mb-3">
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
              </div>

              {/* Chương 2 */}
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
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-text-secondary mb-2 text-sm">
            File tài liệu <span className="text-error">*</span>
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
        <div className="flex justify-end">
          <button className="btn bg-text-fithdary rounded-lg text-white">
            Thêm
          </button>
        </div>
      </div>
    </dialog>
  );
};
