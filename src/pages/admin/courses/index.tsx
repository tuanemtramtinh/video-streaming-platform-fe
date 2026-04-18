import Pagination from "@/components/Pagination";
import { AdminCourseCardSkeleton } from "@/components/Skeletons/AdminCourseCardSkeleton";
import { useGetCourseByInstructor } from "@/hooks/useGetCourseByInstructor";
import { useAuthStore } from "@/stores/useAuthStore";
import { Search } from "lucide-react";
import { useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router";

const CardItem = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div>
      <h3 className="text-color-primary text-lg font-semibold">{title}</h3>
      <div className="text-text-secondary text-sm">{desc}</div>
    </div>
  );
};

const Card = ({
  id,
  title,
  price,
}: {
  id: number;
  title: string;
  price: string;
}) => {
  return (
    <Link
      to={`/admin/courses/${id}`}
      className="card border-border border shadow-sm"
    >
      <div className="card-body">
        <div className="card-title border-border border-b pb-2">
          <div>
            <div className="badge border-border text-color-primary mb-2 bg-[#F1F5F9] text-xs font-semibold">
              Lập trình
            </div>
            <div>{title}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <CardItem title={price} desc="Giá" />
          <CardItem title="13" desc="Số chương" />
          <CardItem title="254" desc="Đã đăng ký" />
          <CardItem title="25" desc="Chứng chỉ" />
          <CardItem title="25" desc="Đánh giá" />
          <CardItem title="500" desc="Yêu thích" />
        </div>
      </div>
    </Link>
  );
};

export default function AdminCoursePage() {
  const user = useAuthStore((state) => state.user);

  const [keywordParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(keywordParams.get("page")) || 1;
  const limit = Number(keywordParams.get("limit")) || 9;
  const keywordFromUrl = keywordParams.get("keyword") ?? undefined;

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isPending } = useGetCourseByInstructor(
    user?.id as string,
    pageFromUrl,
    limit,
    keywordFromUrl,
  );

  const handleChangePage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(keywordFromUrl ? { keyword: keywordFromUrl } : {}),
    });
  };

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const trimmed = value.trim();
        setSearchParams({
          page: "1",
          limit: limit.toString(),
          ...(trimmed ? { keyword: trimmed } : {}),
        });
      }, 500);
    },
    [limit, setSearchParams],
  );

  const lastPage = data?.meta?.lastPage ?? 1;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Khoá học</h2>
        <Link
          to={"/admin/courses/new"}
          className="btn bg-text-fourthdary rounded-lg text-white"
        >
          Thêm khoá học
        </Link>
      </div>
      <label className="input mb-6 w-full rounded-lg">
        <Search />
        <input
          type="search"
          className="grow"
          placeholder="Tìm kiếm khoá học..."
          defaultValue={keywordFromUrl ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>
      <div className="flex flex-1 flex-col gap-6">
        <div className="grid flex-1 grid-cols-3 content-start gap-3">
          {isPending ? (
            Array.from({ length: limit }, (_, i) => (
              <AdminCourseCardSkeleton key={i} />
            ))
          ) : data?.data?.length ? (
            data.data.map((course) => (
              <Card
                key={course.id}
                id={course.id}
                title={course.title}
                price={course.price.toLocaleString()}
              />
            ))
          ) : (
            <div>No Course</div>
          )}
        </div>
        <Pagination
          currentPage={pageFromUrl}
          lastPage={lastPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
