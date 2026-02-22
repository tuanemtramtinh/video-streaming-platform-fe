import TeacherImage from "@/assets/teacher.png";

export const TeacherCardItem = () => {
  return (
    <div className="card border-border border shadow-lg">
      <figure className="px-4 pt-4">
        <div className="h-auto w-full overflow-hidden rounded-lg">
          <img
            className="h-full w-full object-cover"
            src={TeacherImage}
            alt=""
          />
        </div>
      </figure>
      <div className="card-body items-center p-4">
        <div className="border-border flex w-full flex-col items-center border-b pb-4">
          <h2 className="card-title text-color-primary">Ronald Richards</h2>
          <p className="text-text-secondary text-sm">Nhà thiết kế UI/UX</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="rating">
              <div
                className="mask mask-star w-4 bg-orange-400"
                aria-label="1 star"
                aria-current="true"
              ></div>
            </div>
            <span className="text-color-primary mt-1 text-sm font-semibold">
              4.6
            </span>
          </div>
          <div className="text-text-secondary text-sm font-semibold">
            2400 Học viên
          </div>
        </div>
      </div>
    </div>
  );
};
