import { CustomizableCollapse } from "@/components/CustomizableCollapse";
import { ChevronLeft, NotebookPen } from "lucide-react";
import { LessonDocumentDrawer } from "@/components/LessonDocumentDrawer";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useNavigate, useParams } from "react-router";
import { type ILesson, LessonType, VideoStatus } from "@/types/lesson.type";
import { useEffect, useState } from "react";
import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";

export default function SectionsPage() {
  const navigate = useNavigate();
  const { id, sectionId, lessonId } = useParams();

  const { data, isSuccess } = useGetCourseDetail(id as string);

  const [lesson, setLesson] = useState<ILesson | null>(null);

  useEffect(() => {
    if (data && isSuccess) {
      const currentSection = data.sections.find(
        (section) => section.id === Number(sectionId),
      );
      const currentLesson = (currentSection?.lessons || []).find(
        (lesson) => lesson.id === Number(lessonId),
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLesson(currentLesson!);
    }
  }, [data, isSuccess, sectionId, lessonId]);

  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate(`/courses/${id}`)}
            >
              <ChevronLeft />
            </button>
            <h2 className="text-color-primary text-2xl font-semibold">
              {lesson?.title ?? "Loading..."}
            </h2>
          </div>
          <div className="flex gap-3">
            <LessonDocumentDrawer />
            <button className="btn btn-primary">
              <NotebookPen /> Ghi chú
            </button>
          </div>
        </div>

        <div className="flex items-start gap-10">
          <div className="flex-8">
            {lesson &&
            lesson.lessonType === LessonType.VIDEO &&
            lesson.videoStatus !== VideoStatus.PENDING &&
            lesson.videoStatus !== VideoStatus.PROCESS ? (
              <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl">
                <MediaPlayer
                  title=""
                  src={
                    lesson.videoStatus === VideoStatus.READY
                      ? lesson.contentUrl
                      : "https://s3-hcm-r2.s3cloud.vn/video/jujutsu-kaisen/ep-01/master.m3u8"
                  }
                  crossOrigin
                >
                  <MediaProvider>
                    {/* <Track
                      src="https://s3-hcm-r2.s3cloud.vn/video/jujutsu-kaisen/ep-01/subtitles/vi.vtt"
                      kind="subtitles"
                      label="Tiếng Việt"
                      lang="vi"
                      default
                    /> */}
                  </MediaProvider>
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              </div>
            ) : lesson?.lessonType === LessonType.VIDEO ? (
              <div className="mb-6 flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
                <div className="loading loading-spinner loading-md"></div>
                <div>Video is being processed. Please comeback later.</div>
              </div>
            ) : (
              <></>
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson?.contentText ?? "" }}
            />
          </div>
          <div className="bg-background border-border flex-4 rounded-xl border">
            <h2 className="text-color-primary border-border border-b p-4 text-xl font-semibold">
              Tiến độ khoá học
            </h2>
            <div>
              {(data?.sections ?? []).map((section) => (
                <CustomizableCollapse key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
