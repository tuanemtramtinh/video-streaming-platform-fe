import { Rating } from "@/components/Rating";

export const CourseDetailRating = () => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="rating">
            <div
              className="mask mask-star bg-orange-400"
              aria-label="1 star"
              aria-current="true"
            ></div>
          </div>
          <span className="text-color-primary text-xl font-semibold">4.6</span>
        </div>
        <div className="text-text-secondary text-sm font-medium">
          146,951 Đánh giá
        </div>
      </div>

      <ul>
        <li className="flex items-center gap-2">
          <Rating rating={5} />{" "}
          <span className="text-text-secondary mt-1 text-sm">80%</span>
        </li>
        <li className="flex items-center gap-2">
          <Rating rating={4} />{" "}
          <span className="text-text-secondary mt-1 text-sm">10%</span>
        </li>
        <li className="flex items-center gap-2">
          <Rating rating={3} />{" "}
          <span className="text-text-secondary mt-1 text-sm">5%</span>
        </li>
        <li className="flex items-center gap-2">
          <Rating rating={2} />{" "}
          <span className="text-text-secondary mt-1 text-sm">3%</span>
        </li>
        <li className="flex items-center gap-2">
          <Rating rating={1} />{" "}
          <span className="text-text-secondary mt-1 text-sm">2%</span>
        </li>
      </ul>
    </div>
  );
};
