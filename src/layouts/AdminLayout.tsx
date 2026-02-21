import {
  Book,
  Gauge,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
        <div className="p-4">
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
          <div className="is-drawer-open:justify-end is-drawer-close:justify-center flex w-full">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
            </label>
          </div>
          <ul className="menu w-full">
            {/* Sidebar content here */}
            <li>
              <Link
                to={"/admin"}
                className="is-drawer-close:px-0 is-drawer-close:justify-center flex w-full items-center py-4"
              >
                <Gauge className="" />
                <span className="is-drawer-close:hidden">Bảng điều khiển</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/courses"}
                className="is-drawer-close:px-0 is-drawer-close:justify-center flex w-full items-center py-4"
              >
                <Book className="" />
                <span className="is-drawer-close:hidden">Khoá học</span>
              </Link>
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
        </div>
      </div>
    </div>
  );
}
