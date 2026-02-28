import { Avatar } from "@/components/Avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Book,
  Gauge,
  Menu,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import LogoLight from "@/assets/logo-light.svg";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="drawer-content bg-background">
        <div className="h-full p-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-color-primary is-drawer-close:w-[5vw] is-drawer-open:w-[15vw] flex min-h-full flex-col items-start p-4 text-white">
          <div className="is-drawer-open:justify-between is-drawer-close:justify-center mb-6 flex w-full">
            <div className="is-drawer-close:hidden">
              <img src={LogoLight} className="h-10 object-contain" alt="" />
            </div>
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
            </label>
          </div>
          <ul className="menu w-full flex-1">
            {/* Sidebar content here */}
            <li>
              <NavLink
                to={"/admin"}
                end
                className={({ isActive }) =>
                  `"is-drawer-close:px-0 is-drawer-close:justify-center py-4" flex w-full items-center ${isActive ? "text-text-fourthdary" : "text-white"}`
                }
              >
                <Gauge className="" />
                <span className="is-drawer-close:hidden">Bảng điều khiển</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/courses"}
                className={({ isActive }) =>
                  `"is-drawer-close:px-0 is-drawer-close:justify-center py-4" flex w-full items-center py-4 ${isActive ? "text-text-fourthdary" : "text-white"}`
                }
              >
                <Book className="" />
                <span className="is-drawer-close:hidden">Khoá học</span>
              </NavLink>
            </li>
            <li>
              <Link
                to={"/admin/settings"}
                className="is-drawer-close:px-0 is-drawer-close:justify-center flex w-full items-center py-4"
              >
                <Settings className="" />
                <span className="is-drawer-close:hidden">Cài đặt</span>
              </Link>
            </li>
          </ul>
          <div className="is-drawer-close:justify-center flex w-full items-center justify-between">
            <div className="is-drawer-close:justify-center flex items-center gap-2">
              <Avatar
                width="w-10"
                url={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`}
              />
              <span className="text-background is-drawer-close:hidden font-medium">
                Chào, {user?.firstName}
              </span>
            </div>
            <button className="btn btn-ghost btn-sm is-drawer-close:hidden">
              <Menu />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
