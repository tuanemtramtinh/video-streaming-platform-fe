export const CourseCardItemSkeleton = () => {
  return (
    <div className="card border-border border shadow-lg">
      <figure className="px-4 pt-4">
        <div className="h-34 w-full overflow-hidden rounded-lg">
          <div className="skeleton h-full w-full rounded-lg" />
        </div>
      </figure>
      <div className="card-body text-text-secondary p-4">
        <div className="skeleton mb-2 h-7 w-3/4" />
        <div className="skeleton mb-2 h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-4 w-32" />
        </div>
        <div className="skeleton mb-2 h-4 w-full max-w-xs" />
        <div className="skeleton h-8 w-28" />
      </div>
    </div>
  );
};
