import { Bell, LogOut, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import webLogo from "../../assets/logo.svg";
import { Avatar } from "@/components/Avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/useLogout";

export const ClientHeader = () => {
  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken) as string;
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout({ refreshToken });
  };

  return (
    <div className="border-b border-gray-200">
      <header className="text-text-secondary container mx-auto flex items-center justify-between py-3 text-sm font-medium">
        <Link to={""}>
          <img src={webLogo} />
        </Link>
        <Link to={"courses"}>Khoá học</Link>
        <label className="input w-1/2 focus-within:outline-none">
          <Search />
          <input
            type="search"
            className="text-text-secondary grow outline-none"
            placeholder="Tìm kiếm khoá học"
          />
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
            <Avatar
              width="w-10"
              url={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
            />
          )}

          {user && (
            <button className="btn btn-neutral" onClick={handleLogout}>
              <LogOut />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};
