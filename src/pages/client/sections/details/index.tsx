import { CustomizableCollapse } from "@/components/CustomizableCollapse";
import { ChevronLeft, FileText, NotebookPen } from "lucide-react";
import { DocumentDrawerTrigger } from "./DocumentDrawerTrigger";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export default function SectionsPage() {
  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm">
              <ChevronLeft />
            </button>
            <h2 className="text-color-primary text-2xl font-semibold">
              Giới thiệu về Thiết kế Trải nghiệm Người dùng
            </h2>
          </div>
          <div className="flex gap-3">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle"
              />
              <DocumentDrawerTrigger drawerId="my-drawer-1" />
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-1"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="bg-base-200 min-h-full w-1/3 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-color-primary text-2xl font-semibold">
                      Tài liệu bài học
                    </h2>
                    <select defaultValue="Pick a color" className="select">
                      <option disabled={true}>Pick a color</option>
                      <option>Chương hiện tại</option>
                      <option>Chương 2</option>
                      <option>Chương 3</option>
                    </select>
                  </div>
                  <ul className="menu w-full gap-3">
                    <li>
                      <div className="border-border bg-background text-color-primary flex justify-between border">
                        <div className="flex items-center gap-2">
                          <FileText />
                          <span>Tài liệu chương 1.pdf</span>
                        </div>
                        <div>Tải xuống</div>
                      </div>
                    </li>
                    <li>
                      <div className="border-border bg-background text-color-primary flex justify-between border">
                        <div className="flex items-center gap-2">
                          <FileText />
                          <span>Tài liệu chương 2.pdf</span>
                        </div>
                        <div>Tải xuống</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">
              <NotebookPen /> Ghi chú
            </button>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex-8">
            <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl">
              <MediaPlayer
                title="Jujutsu Kaisen"
                src="https://s3-hcm-r2.s3cloud.vn/video/jujutsu-kaisen/ep-01/master.m3u8"
                crossOrigin
              >
                <MediaProvider>
                  <Track
                    src="https://s3-hcm-r2.s3cloud.vn/video/jujutsu-kaisen/ep-01/subtitles/vi.vtt"
                    kind="subtitles"
                    label="Tiếng Việt"
                    lang="vi"
                    default
                  />
                </MediaProvider>
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
            <div>
              <h2 className="text-color-primary mb-6 text-2xl font-semibold">
                Understanding User-Centered Design
              </h2>
              <div>
                Một phần tử HTML thường bao gồm thẻ mở và thẻ đóng, với nội dung
                được chèn giữa cặp thẻ. Phần tử thường có cấu trúc như sau:
                Những phần tử HTML không có nội dung được gọi là phần tử rỗng.
                Các phần tử rỗng không có thẻ đóng, ví dụ như thẻ {"<br>"} (thẻ
                này dùng để ngắt dòng.)
              </div>
            </div>
          </div>
          <div className="bg-background border-border x flex-4 rounded-xl border">
            <h2 className="text-color-primary border-border border-b p-4 text-xl font-semibold">
              Tiến độ khoá học
            </h2>
            <CustomizableCollapse />
            <CustomizableCollapse />
            <CustomizableCollapse />
            <CustomizableCollapse />
          </div>
        </div>
      </div>
    </div>
  );
}
