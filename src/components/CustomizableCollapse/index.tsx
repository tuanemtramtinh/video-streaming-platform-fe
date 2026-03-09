import { Video } from "lucide-react";
import type { ReactNode } from "react";

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

export const CustomizableCollapse = () => {
  return (
    <div className="join join-vertical w-full">
      <CollapseItem
        contentStyle={""}
        title={
          <div className="flex items-center justify-between">
            <h3 className="text-color-primary text-md font-semibold">
              1. Introduction to UX Design
            </h3>
            <div className="text-text-secondary text-sm font-normal">
              <span className="mr-4">5 Bài học</span>
              <span>1 Giờ</span>
            </div>
          </div>
        }
        content={
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-color-primary">
                1. What is User Experience (UX) Design?
              </div>
              <div className="text-text-secondary flex items-center gap-1">
                <Video />4 phút
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-color-primary">
                2. What is User Experience (UX) Design?
              </div>
              <div className="text-text-secondary flex items-center gap-1">
                <Video />4 phút
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
