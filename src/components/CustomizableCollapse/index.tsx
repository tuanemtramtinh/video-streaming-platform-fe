import type { ILesson } from "@/types/lesson.type";
import type { ISection } from "@/types/section.type";
import { FileQuestionMark, FileText, PlayCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router";

const lessonTypeIcon = {
  video: PlayCircle,
  document: FileText,
  quiz: FileQuestionMark,
};

const LessonItem = ({
  sectionId,
  lesson,
}: {
  sectionId: number;
  lesson: ILesson;
}) => {
  const { id } = useParams();
  const Icon = lessonTypeIcon[lesson.lessonType];

  return (
    <Link
      to={`/courses/${id}/sections/${sectionId}/lessons/${lesson.id}`}
      className="group flex items-center justify-between rounded-md px-2 py-1 transition-colors hover:bg-gray-100"
    >
      <div className="text-color-primary truncate group-hover:underline">
        {lesson.title}
      </div>
      <div className="text-text-secondary group-hover:text-color-primary flex items-center gap-1">
        <Icon />
      </div>
    </Link>
  );
};

const CollapseItem = ({
  title,
  content,
  contentStyle,
}: {
  title: ReactNode;
  content: ReactNode;
  contentStyle?: string;
}) => {
  return (
    <div className={`join-item collapse-arrow collapse`}>
      <input type="checkbox" name="my-accordion-1" defaultChecked />
      <div className="collapse-title font-semibold">{title}</div>
      <div className={`collapse-content text-sm ${contentStyle}`}>
        {content}
      </div>
    </div>
  );
};

export const CustomizableCollapse = ({ section }: { section: ISection }) => {
  return (
    <div className="join join-vertical w-full">
      <CollapseItem
        contentStyle={""}
        title={
          <div className="flex items-center justify-between">
            <h3 className="text-color-primary text-md truncate font-semibold">
              {section.title}
            </h3>
            {/* <div className="text-text-secondary text-sm font-normal">
              <span className="mr-4">5 Bài học</span>
              <span>1 Giờ</span>
            </div> */}
          </div>
        }
        content={
          <div className="flex flex-col gap-4">
            {section.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                sectionId={section.id}
                lesson={lesson}
              />
            ))}
          </div>
        }
      />
    </div>
  );
};
