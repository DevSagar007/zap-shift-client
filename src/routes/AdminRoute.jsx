import useAuth from "@/hooks/useAuth";
import useRole from "../hooks/useRole";

function AdminRoute(children) {
  const {loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      </>
    );
  }

  if (!role !== "admin") {
    return <div>Access is forbidden</div>;
  }
  return children;
}

export default AdminRoute;
