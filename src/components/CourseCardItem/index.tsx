import { Heart } from "lucide-react";
import { Link } from "react-router";
import { Rating } from "../Rating";

export const CourseCardItem = ({
  id = 1,
  title = "Beginner’s Guide to Design",
  thumbnailUrl = "https://placehold.co/600x400",
  author = "Ronal Richards",
  discount = 0,
  price = 149000,
  isBought = false,
  onRemoveFromWishlist,
}: {
  id: number | string;
  title: string;
  thumbnailUrl: string;
  discount?: number;
  author: string;
  price: number;
  isBought?: boolean;
  onRemoveFromWishlist?: () => void;
}) => {
  const discountPrice = price * ((100 - discount) / 100);

  return (
    <div className="relative h-full">
      {onRemoveFromWishlist && (
        <button
          onClick={onRemoveFromWishlist}
          className="absolute top-2 right-2 z-10 btn btn-circle btn-sm bg-error text-white border-none hover:bg-error/80"
          title="Xoá khỏi yêu thích"
        >
          <Heart className="h-4 w-4" fill="currentColor" />
        </button>
      )}
      <Link to={`/courses/${id}`} className="card border-border border shadow-lg h-full flex flex-col">
      <figure className="px-4 pt-4">
        <div className="h-34 w-full overflow-hidden rounded-lg">
          <img
            className="h-full w-full object-contain"
            src={thumbnailUrl ?? "https://placehold.co/600x400"}
            alt=""
          />
        </div>
      </figure>
      <div className="card-body text-text-secondary p-4 flex flex-col flex-1">
        <h2 className="card-title text-color-primary line-clamp-2 min-h-[3.5rem]">{title}</h2>
        <div>{author}</div>
        <div className="flex items-center gap-2">
          <Rating rating={5} />
          <span className="font-semibold">(1200 đánh giá)</span>
        </div>
        <div> 22 giờ · 155 bài · Cơ bản</div>
        {isBought ? (
          <div className="btn bg-color-primary text-white">Tiếp tục học</div>
        ) : (
          <div className="text-color-primary text-lg font-semibold">
            {" "}
            {discount > 0 && (
              <span className="mr-3">{discountPrice.toLocaleString()} VND</span>
            )}
            <span
              className={`${discount > 0 ? "line-through opacity-30" : ""} `}
            >
              {price.toLocaleString()} VND
            </span>
          </div>
        )}
      </div>
      </Link>
    </div>
  );
};
