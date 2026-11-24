import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
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
    title: "Rider Assigned",
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

const chartColors = ["#0EA5E9", "#14B8A6", "#F59E0B", "#F43F5E", "#8B5CF6"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const chartOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: deliveryStats.map((stat) => getStatusDetails(stat.status ?? stat._id).title),
    colors: chartColors,
    plotOptions: {
      pie: {
        borderRadius: 12,
        dataLabels: { offset: 0 },
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Parcels",
              formatter: (w) =>
                w.globals.seriesTotals.reduce((total, count) => total + count, 0),
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
      fontSize: "13px",
      labels: { colors: "#64748B" },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: { width: "100%" },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#0B3F45]">Operations control center</p>
      <h2 className="mt-2 text-4xl font-extrabold">Admin Dashboard</h2>
      <p className="mb-5 mt-2 text-slate-600">Monitor parcel flow, assign riders, manage users, and approve new rider applications.</p>
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
                Parcels currently in this stage
              </p>
            </div>
          );
        })}
      </div>

      {deliveryStats.length > 0 && (
        <div className="mt-6 rounded-lg border border-border bg-surface p-5 shadow-card">
          <h3 className="text-lg font-bold text-text-primary">
            Parcel Delivery Overview
          </h3>
          <div className="mt-2 flex justify-center">
            <ReactApexChart
              options={chartOptions}
              series={deliveryStats.map((stat) => stat.count)}
              type="donut"
              width="100%"
              height={380}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
