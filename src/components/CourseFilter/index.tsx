import { ListFilter } from "lucide-react";

export const CourseFilter = () => {
  return (
    <div className="mb-6 flex justify-between text-sm">
      <div>
        <button className="btn btn-outline btn-md mr-4">
          <ListFilter />
          Bộ lọc
        </button>
        <span className="text-text-fourthdary">Xoá bộ lọc</span>
      </div>
      <div className="flex items-center justify-end">
        <div className="mr-4">Sắp xếp theo</div>
        <select
          defaultValue="newest"
          className="select w-auto focus-within:outline-none"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="highest-price">Giá cao nhất</option>
          <option value="lowest-price">Giá thấp nhất</option>
        </select>
      </div>
    </div>
  );
};
