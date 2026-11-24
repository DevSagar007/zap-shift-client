import useAuth from "@/hooks/useAuth";
import useRole from "../hooks/useRole";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";

function AdminRoute({ children }) {
  const { loading } = useAuth();
  const { role, isRoleLoading, isRoleFetching } = useRole();

  if (loading || isRoleLoading || isRoleFetching) {
    return (
      <div className="min-h-screen p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (role !== "admin") {
    return <div className="p-8 text-center text-slate-600">This page is available to Zap Shift administrators only.</div>;
  }
  return children;
}

export default AdminRoute;
