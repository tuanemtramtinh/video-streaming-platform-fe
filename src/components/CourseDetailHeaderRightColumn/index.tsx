export const CourseDetailHeaderRightColumn = ({
  price,
  discount,
  thumbnailUrl,
}: {
  price: number;
  discount: number;
  thumbnailUrl: string;
}) => {
  const discountPrice = price * (discount / 100);

  return (
    <div className="card border-border shadow-lg">
      <figure className="px-6 pt-6">
        <div className="h-50 w-full">
          <img
            src={
              thumbnailUrl ?? "https://placehold.co/600x400?text=Hello+World"
            }
            className="h-full w-full object-cover"
          />
        </div>
      </figure>
      <div className="card-body">
        <div className="card-title text-color-primary flex justify-between text-xl">
          <div className="flex items-center">
            {discount > 0 && <span className="mr-3">{discountPrice} VND</span>}
            <span
              className={`${discount > 0 ? "line-through opacity-30" : ""} `}
            >
              {price.toLocaleString()} VND
            </span>
          </div>
          {discount > 0 && <div className="text-success">Ưu đãi 50%</div>}
        </div>
        <div className="card-actions mt-6">
          <button className="btn btn-neutral btn-block">Đăng ký học</button>
        </div>
      </div>
    </div>
  );
};
