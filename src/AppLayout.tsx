// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Outlet } from "react-router"

function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )

}
export default AppLayout
