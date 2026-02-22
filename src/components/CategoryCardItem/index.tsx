export const CategoryCardItem = ({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) => {
  return (
    <div className="card border-border border">
      <figure className="px-6 pt-6">
        <div className="rounded-full bg-[#E0F2FE] p-[30px]">{icon}</div>
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title text-color-primary text-xl">{title}</h2>
        <p className="text-text-secondary">{count} khóa học</p>
      </div>
    </div>
  );
};
