import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const normalizeStatus = (status = "") => status.replaceAll("-", "_");
const getTrackingCreatedAt = (tracking) => tracking?.createdAt || tracking?.createAt;

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/trackings/${trackingId}/logs`
      );

      return res.data;
    },
  });

  // All possible tracking steps
  const trackingSteps = [
    {
      status: "parcel_created",
      matchingStatuses: ["parcel_created"],
      title: "Parcel Created",
      description: "Your parcel request has been created.",
    },
    {
      status: "parcel_paid",
      matchingStatuses: ["parcel_paid"],
      title: "Parcel Paid",
      description: "Payment has been completed for this parcel.",
    },
    {
      status: "pending_pickup",
      matchingStatuses: ["pending-pickup", "pending_pickup"],
      title: "Pending Pickup",
      description: "Your parcel is waiting for pickup.",
    },
    {
      status: "driver_assigned",
      matchingStatuses: ["driver_assigned", "diver_assigned", "rider_assigned", "rider-assigned"],
      title: "Driver Assigned",
      description: "A driver has been assigned to your parcel.",
    },
    {
      status: "picked_up",
      matchingStatuses: ["picked_up", "parcel_picked_up"],
      title: "Picked Up",
      description: "Your parcel has been picked up from the sender.",
    },
    // {
    //   status: "in_transit",
    //   matchingStatuses: ["in_transit"],
    //   title: "In Transit",
    //   description: "Your parcel is on the way.",
    // },
    // {
    //   status: "out_for_delivery",
    //   matchingStatuses: ["out_for_delivery"],
    //   title: "Out for Delivery",
    //   description: "Your parcel is out for delivery.",
    // },
    {
      status: "delivered",
      matchingStatuses: ["delivered", "parcel_delivered"],
      title: "Delivered",
      description: "Your parcel has been delivered successfully.",
    },
  ];

  const findTrackingByStep = (step) => {
    return trackings
      .filter((tracking) =>
        step.matchingStatuses.some(
          (status) => normalizeStatus(tracking.status) === normalizeStatus(status)
        )
      )
      .sort((firstTracking, secondTracking) => {
        const firstTime = new Date(getTrackingCreatedAt(firstTracking)).getTime();
        const secondTime = new Date(getTrackingCreatedAt(secondTracking)).getTime();

        return firstTime - secondTime;
      })[0];
  };

  // Check whether a status exists in API logs
  const isCompleted = (step) => {
    return Boolean(findTrackingByStep(step));
  };

  // Get tracking date from API
  const getTrackingDate = (step) => {
    const tracking = findTrackingByStep(step);

    if (!tracking) return null;

    const trackingDate = getTrackingCreatedAt(tracking);

    if (!trackingDate) return null;

    return new Date(trackingDate).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium text-primary">
            TRACKING ID
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            {trackingId}
          </h2>

          <p className="mt-2 text-gray-500">
            Track your package delivery status
          </p>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="py-10 text-center text-gray-500">
            Loading tracking information...
          </div>
        ) : (
          <div className="relative">

            {trackingSteps.map((step, index) => {
              const completed = isCompleted(step);
              const date = getTrackingDate(step);

              return (
                <div
                  key={step.status}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {/* Vertical Line */}
                  {index !== trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-6 h-full w-[2px] ${
                        completed
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  {/* Circle */}
                  <div
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      completed
                        ? "bg-gray-900"
                        : "border-2 border-gray-300 bg-white"
                    }`}
                  >
                    {completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="h-3.5 w-3.5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 12 4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        {/* Date */}
                        <p className="text-xs font-medium text-gray-400">
                          {date || "Upcoming"}
                        </p>

                        {/* Title */}
                        <h3
                          className={`mt-1 text-base font-semibold ${
                            completed
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`mt-1 text-sm ${
                            completed
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>

                      {/* Status */}
                      {completed && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                          Completed
                        </span>
                      )}

                      {!completed && (
                        <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-400">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelTrack;
