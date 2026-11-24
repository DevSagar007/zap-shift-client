import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
