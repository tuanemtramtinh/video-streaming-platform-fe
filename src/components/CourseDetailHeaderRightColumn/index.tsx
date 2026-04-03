export const CourseDetailHeaderRightColumn = ({
  price,
  discount,
  thumbnailUrl,
}: {
  price: number;
  discount: number;
  thumbnailUrl: string;
}) => {
  const discountPrice = price * ((100 - discount) / 100);

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
        <div className="flex flex-col gap-2">
          {discount > 0 && (
            <span className="badge badge-success w-fit font-semibold">
              Ưu đãi {discount}%
            </span>
          )}
          <span className="text-color-primary text-2xl font-bold">
            {discount > 0
              ? discountPrice.toLocaleString()
              : price.toLocaleString()}{" "}
            VND
          </span>
          {discount > 0 && (
            <span className="text-base line-through opacity-40">
              {price.toLocaleString()} VND
            </span>
          )}
        </div>
        <div className="card-actions mt-6">
          <button className="btn btn-neutral btn-block">Đăng ký học</button>
        </div>
      </div>
    </div>
  );
};
