import { Bell, Book, Gauge, LogOut, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import webLogo from "../../assets/logo.svg";
import { Avatar } from "@/components/Avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/useLogout";
import { useState } from "react";
import { useSearchCourse } from "@/hooks/useSearchCourse";
import { useDebounce } from "@/hooks/useDebounce";

const SearchItem = ({
  courseId,
  thumbnailUrl,
  title,
  price,
  discount,
  onClick,
}: {
  courseId: number;
  thumbnailUrl: string;
  title: string;
  price: number;
  discount: number;
  onClick: () => void;
}) => {
  console.log(discount);
  return (
    <Link
      to={`/courses/${courseId}`}
      className="hover:bg-base-200 flex cursor-pointer items-center justify-between p-3"
      onClick={onClick}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="aspect-square w-16 shrink-0">
          <img
            className="h-full w-full object-contain"
            src={thumbnailUrl ?? "https://placehold.co/600x400"}
            alt=""
          />
        </div>
        <div className="flex-1 truncate">{title ?? "Loading..."}</div>
      </div>
      <div>
        {discount && (
          <span className="text-success mr-2 font-bold">
            {(price * ((100 - discount) / 100)).toLocaleString()} VND
          </span>
        )}
        <span className={`${discount ? "line-through" : ""}`}>
          {(price ?? 0).toLocaleString()} VND
        </span>
      </div>
    </Link>
  );
};

export const ClientHeader = () => {
  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken) as string;
  const { mutate: logout } = useLogout();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const handleLogout = () => {
    logout({ refreshToken });
  };

  const { data, isLoading } = useSearchCourse(
    debouncedSearch === "" ? undefined : debouncedSearch,
  );

  return (
    <div className="border-b border-gray-200">
      <header className="text-text-secondary container mx-auto flex items-center justify-between py-3 text-sm font-medium">
        <Link to={""}>
          <img src={webLogo} />
        </Link>
        <Link to={"courses"}>Khoá học</Link>
        <label className="input relative w-1/2 overflow-visible focus-within:z-50 focus-within:outline-none">
          <Search />
          <input
            type="search"
            className="text-text-secondary grow outline-none"
            placeholder="Tìm kiếm khoá học"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search !== "" && (
            <div className="border-border absolute top-[calc(110%)] right-0 left-0 z-50 rounded-lg border bg-white">
              <>
                {isLoading && (
                  <div className="p-3 text-gray-500">Đang tìm...</div>
                )}
                {data?.data.map((course) => (
                  <SearchItem
                    key={course.id}
                    courseId={course.id}
                    thumbnailUrl={course.thumbnailUrl}
                    title={course.title}
                    price={course.price}
                    discount={course.discount}
                    onClick={() => setSearch("")}
                  />
                ))}
              </>
            </div>
          )}
        </label>

        {/* <div>Đăng ký giảng viên</div> */}

        <div className="flex items-center gap-6">
          <ShoppingCart size={24} />

          {user && <Bell size={24} />}

          {!user && (
            <Link to={"register"} className="btn btn-outline">
              Đăng ký
            </Link>
          )}

          {!user && (
            <Link to={"login"} className="btn btn-neutral btn-md">
              Đăng nhập
            </Link>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <Avatar
                  width="w-10"
                  url={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                />
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link to={"/admin"} className="inline-flex items-center">
                    <Gauge />
                    <span>Trang Quản Lý</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/my-courses"} className="inline-flex items-center">
                    <Book />
                    <span>Khoá học của tôi</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {user && (
            <div className="tooltip tooltip-bottom" data-tip="Đăng Xuất">
              <button className="btn btn-neutral" onClick={handleLogout}>
                <LogOut />
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
