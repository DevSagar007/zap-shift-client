import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>
      </div>
    </div>
  );
}

export default AuthLayout;
