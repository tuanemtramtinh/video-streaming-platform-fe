import { Avatar } from "@/components/Avatar";

export const CourseDetailComment = () => {
  return (
    <div className="card border-border border">
      <div className="card-body">
        <div className="flex items-start gap-25">
          <div className="flex flex-1 items-center gap-3">
            <Avatar />
            <div className="text-lg font-semibold">Mark Doe</div>
          </div>
          <div className="flex-3">
            <div className="mb-2 flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="rating">
                  <div
                    className="mask mask-star bg-orange-400"
                    aria-label="1 star"
                    aria-current="true"
                  ></div>
                </div>
                <span className="mt-1 text-lg font-semibold">5</span>
              </div>
              <div className="text-text-secondary text-sm">
                Ngày 22 tháng 3 năm 2024.
              </div>
            </div>

            <p className="text-justify">
              I was initially apprehensive, having no prior design experience.
              But the instructor, John Doe, did an amazing job of breaking down
              complex concepts into easily digestible modules. The video
              lectures were engaging, and the real-world examples really helped
              solidify my understanding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
