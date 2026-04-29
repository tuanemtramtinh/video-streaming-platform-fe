import { CourseCardItem } from "@/components/CourseCardItem";
import { CourseLeftColumn } from "@/components/CourseLeftColumn";
import Pagination from "@/components/Pagination";
import { useGetWishlist } from "@/hooks/useGetWishlist";
import { useRemoveFromWishlist } from "@/hooks/useRemoveFromWishlist";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

export default function WishlistPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;

  const { data, isSuccess } = useGetWishlist(pageFromUrl, limit);
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();

  const handleChangePage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
  };

  const lastPage = data?.meta?.lastPage ?? 1;

  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold">Danh sách yêu thích</h2>
          <div>Các khoá học bạn đã lưu để xem sau</div>
        </div>

        <div className="flex gap-10">
          <div className="flex-1">
            <CourseLeftColumn />
          </div>

          <div className="flex-4">
            <label className="input mb-6 w-full">
              <Search />
              <input type="search" className="grow" placeholder="Search" />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>

            {isSuccess && data?.data?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                <p className="text-lg font-medium">Bạn chưa có khoá học yêu thích nào</p>
                <p className="mt-1 text-sm">Hãy thêm khoá học vào danh sách yêu thích để xem sau</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-5">
              {isSuccess &&
                data?.data.map((item) => (
                  <CourseCardItem
                    key={item.courseId}
                    id={item.course.id}
                    title={item.course.title}
                    thumbnailUrl={item.course.thumbnailUrl}
                    author={`${item.course.instructor.lastName} ${item.course.instructor.firstName}`}
                    price={item.course.price}
                    discount={item.course.discount}
                    onRemoveFromWishlist={() =>
                      removeFromWishlist({ courseId: item.courseId })
                    }
                  />
                ))}
            </div>

            <div className="flex w-full justify-center mt-6">
              <Pagination
                currentPage={pageFromUrl}
                lastPage={lastPage}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
