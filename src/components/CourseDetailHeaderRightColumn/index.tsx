export const CourseDetailHeaderRightColumn = () => {
  return (
    <div className="card border-border shadow-lg">
      <figure className="px-6 pt-6">
        <div className="h-50 w-full">
          <img
            src="https://placehold.co/600x400?text=Hello+World"
            className="h-full w-full object-cover"
          />
        </div>
      </figure>
      <div className="card-body">
        <div className="card-title text-color-primary flex justify-between text-2xl">
          <div className="flex items-center">
            <span className="mr-3">100.000đ</span>
            <span className="text-xl line-through opacity-30">200.000đ</span>
          </div>
          <div className="text-success">Ưu đãi 50%</div>
        </div>
        <div className="card-actions mt-6">
          <button className="btn btn-neutral btn-block">Đăng ký học</button>
        </div>
      </div>
    </div>
  );
};
