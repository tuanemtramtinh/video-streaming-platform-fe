import { Link } from "react-router";
import { Rating } from "../Rating";

export const CourseCardItem = () => {
  return (
    <Link to={"/courses/1"} className="card border-border border shadow-lg">
      <figure className="px-4 pt-4">
        <div className="h-34 w-full overflow-hidden rounded-lg">
          <img
            className="h-full w-full object-cover"
            src="https://placehold.co/600x400"
            alt=""
          />
        </div>
      </figure>
      <div className="card-body text-text-secondary p-4">
        <h2 className="card-title text-color-primary">
          Beginner’s Guide to Design
        </h2>
        <div>Ronald Richards</div>
        <div className="flex items-center gap-2">
          <Rating rating={5} />
          <span className="font-semibold">(1200 đánh giá)</span>
        </div>
        <div> 22 giờ · 155 bài · Cơ bản</div>
        <div className="text-color-primary text-xl font-semibold">$149.9</div>
      </div>
    </Link>
  );
};
