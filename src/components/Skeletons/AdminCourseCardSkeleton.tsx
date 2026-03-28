const CardItemSkeleton = () => {
  return (
    <div>
      <div className="skeleton mb-1 h-7 w-12" />
      <div className="skeleton h-4 w-20" />
    </div>
  );
};

export const AdminCourseCardSkeleton = () => {
  return (
    <div className="card border-border border shadow-sm">
      <div className="card-body">
        <div className="card-title border-border border-b pb-2">
          <div>
            <div className="mb-2 w-fit">
              <div className="skeleton h-5 w-24 rounded-md" />
            </div>
            <div className="skeleton h-6 w-4/5 max-w-xs" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <CardItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
