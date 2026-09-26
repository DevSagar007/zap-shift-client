import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock3,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const deliveryStatusDetails = {
  diver_assigned: {
    title: "Driver Assigned",
    icon: Truck,
    iconClass: "border-info/20 bg-info-soft text-info-text",
  },
  "pending-pickup": {
    title: "Pending Pickup",
    icon: Clock3,
    iconClass: "border-warning/25 bg-warning-soft text-warning-text",
  },
  parcel_delivered: {
    title: "Parcel Delivered",
    icon: CheckCircle2,
    iconClass: "border-success/25 bg-success-soft text-success-text",
  },
  parcel_picked_up: {
    title: "Parcel Picked Up",
    icon: PackageCheck,
    iconClass: "border-primary-border bg-primary-soft text-primary",
  },
  null: {
    title: "No Status",
    icon: Package,
    iconClass: "border-border bg-surface-muted text-text-secondary",
  },
};

const fallbackStatusDetails = {
  title: "Other",
  icon: Package,
  iconClass: "border-border bg-surface-muted text-text-secondary",
};

const formatCount = (count) => count.toLocaleString();

const getStatusDetails = (status) =>
  deliveryStatusDetails[status] || fallbackStatusDetails;

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">Admin Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {deliveryStats.map((stat) => {
          const details = getStatusDetails(stat._id);
          const Icon = details.icon;

          return (
            <div
              key={stat._id ?? "no-status"}
              className="min-w-0 rounded-lg border border-border bg-surface p-5 shadow-card transition-all hover:border-border-strong hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-text-secondary">
                  {details.title}
                </p>

                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-panel border ${details.iconClass}`}
                >
                  <Icon className="size-5" />
                </span>
              </div>

              <p className="mt-2 text-3xl font-bold leading-none text-text-primary">
                {formatCount(stat.count)}
              </p>

              <p className="mt-3 text-sm text-text-muted">
                Parcels in this status
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
