import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="p-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-admin-sidebar min-h-full w-[15vw] p-4 text-white">
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
  );
}
