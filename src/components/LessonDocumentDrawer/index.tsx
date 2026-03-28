import { BookOpenText, FileText } from "lucide-react";

const DRAWER_ID = "lesson-document-drawer";

export function LessonDocumentDrawer() {
  return (
    <div className="drawer drawer-end">
      <input
        id={DRAWER_ID}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label
          htmlFor={DRAWER_ID}
          className="btn btn-info drawer-button text-white"
        >
          <BookOpenText />
          Tài liệu
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={DRAWER_ID}
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
  );
}
