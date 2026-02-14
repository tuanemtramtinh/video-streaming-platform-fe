import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

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
      <div className="drawer-content">
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
              <a className="">Sidebar Item 1</a>
            </li>
            <li>
              <a className="">Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
