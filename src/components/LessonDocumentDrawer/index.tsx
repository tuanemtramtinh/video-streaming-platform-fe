import { useGetResourcesByLessonId } from "@/hooks/useGetResourcesByLessonId";
import { BookOpenText, FileText } from "lucide-react";
// import { useState } from "react";
import { useParams } from "react-router";

const DRAWER_ID = "lesson-document-drawer";

export function LessonDocumentDrawer() {
  const { lessonId } = useParams();
  // const [lesson, setLesson] = useState(Number(lessonId as string));

  const { data } = useGetResourcesByLessonId(Number(lessonId as string));

  return (
    <div className="drawer drawer-end">
      <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />
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
            {/* <select defaultValue={lessonId} className="select">
              <option value={lessonId}>Bài học hiện tại</option>
              <option>Chương hiện tại</option>
              <option>Chương 2</option>
              <option>Chương 3</option>
            </select> */}
          </div>
          <ul className="menu w-full gap-3">
            {data?.map((resource) => (
              <li key={resource.id}>
                <div className="border-border bg-background text-color-primary flex justify-between border">
                  <div className="flex items-center gap-2">
                    <FileText />
                    <span>{resource.title}</span>
                    {/* <span>Định dạng: {resource.fileType}</span> */}
                  </div>
                  <a download href={resource.fileUrl} className="btn btn-info">
                    Tải xuống
                  </a>
                </div>
              </li>
            ))}
            {/* <li>
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
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
