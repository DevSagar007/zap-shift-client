import useAuth from "@/hooks/useAuth";
import useRole from "../hooks/useRole";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";

function RiderRoute({ children }) {
  const { loading } = useAuth();
  const { role, isRoleLoading, isRoleFetching } = useRole();

  if (loading || isRoleLoading || isRoleFetching) {
    return (
      <div className="min-h-screen p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (role !== "rider") {
    return <div className="p-8 text-center text-slate-600">This page is available to approved Zap Shift riders only.</div>;
  }

  return children;
}

export default RiderRoute;
