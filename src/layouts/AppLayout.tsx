import { Outlet } from "react-router";
import { ClientHeader } from "../components/ClientHeader";
import { ClientFooter } from "../components/ClientFooter";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ClientHeader />

      <div className="container mx-auto flex-1">
        <Outlet />
      </div>

      <ClientFooter />
    </div>
  );
}
export default AppLayout;
