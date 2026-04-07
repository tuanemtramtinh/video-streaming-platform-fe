import type { ILesson } from "@/types/lesson.type";
import type { ISection } from "@/types/section.type";
import { FileQuestionMark, FileText, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router";

const lessonTypeIcon = {
  video: PlayCircle,
  document: FileText,
  quiz: FileQuestionMark,
};

const ListItem = ({
  courseId,
  sectionId,
  lesson,
}: {
  courseId: string;
  sectionId: number;
  lesson: ILesson;
}) => {
  const Icon = lessonTypeIcon[lesson.lessonType];
  return (
    <Link
      to={`/courses/${courseId}/sections/${sectionId}/lessons/${lesson.id}`}
      className="border-border flex items-center justify-between border-b py-3"
    >
      <div>{lesson.title}</div>
      <div>
        <Icon />
      </div>
    </Link>
  );
};

const SectionItem = ({ section }: { section: ISection }) => {
  const { id } = useParams();

  return (
    <div className="join-item border-border collapse-arrow collapse border">
      <input type="checkbox" name="my-accordion-1" />
      <div className="collapse-title font-semibold">
        <div className="flex items-center justify-between">
          <h3 className="text-color-primary text-md truncate font-semibold">
            {section.title}
          </h3>
          <div className="text-text-secondary text-sm font-normal">
            <span className="mr-4">{section.lessons.length} Bài học</span>
            <span>1 Giờ</span>
          </div>
        </div>
      </div>
      <div className="collapse-content text-sm">
        <div className="flex flex-col gap-4">
          {section.lessons.map((lesson) => (
            <ListItem
              key={lesson.id}
              courseId={id as string}
              sectionId={section.id}
              lesson={lesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CourseDetailSectionList = ({
  sections,
}: {
  sections: ISection[];
}) => {
  return (
    <div className="join join-vertical w-full">
      {sections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </div>
  );
};
