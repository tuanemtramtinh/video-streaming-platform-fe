import { Outlet } from "react-router";
import { ClientHeader } from "../components/ClientHeader";
import { ClientFooter } from "../components/ClientFooter";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ClientHeader />

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>

      <ClientFooter />
    </div>
  );
}
export default AppLayout;
