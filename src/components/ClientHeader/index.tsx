import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import webLogo from "../../assets/logo.svg";

export const ClientHeader = () => {
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

        <div>Đăng ký giảng viên</div>

        <div className="flex items-center gap-6">
          <ShoppingCart size={24} />

          <Link to={"register"} className="btn btn-outline">
            Đăng ký
          </Link>
          <Link to={"login"} className="btn btn-neutral btn-md">
            Đăng nhập
          </Link>
        </div>
      </header>
    </div>
  );
};
