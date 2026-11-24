import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";
import { TablePagination } from "@/components/ui/table-pagination";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  paginatedUrl,
  paginatedResult,
  useServerPagination,
} from "../../../hooks/useServerPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { page, setPage, limit } = useServerPagination();

  useEffect(() => {
    setPage(1);
  }, [user?.email, setPage]);

  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["parcels", user?.email, "assignDeliveries", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        paginatedUrl(
          "/parcels/riders",
          { riderEmail: user.email, deliveryStatus: "diver_assigned" },
          { page, limit },
        ),
      );

      return paginatedResult(res, { page, limit });
    },
  });

  const parcels = data?.items ?? [];
  const meta = data?.meta ?? {
    total: 0,
    page,
    limit,
    totalPages: 1,
  };

  const handleAcceptedDelivery = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId
    };

    const message = `Parcel status is updated to ${status?.split("_").join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            title: message,
            text: "Your parcel status has been updated successfully.",
            icon: "success",
          });
        }
      });
  };

  if (isPending || isFetching) return <DashboardSkeleton />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="mb-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        Pending Pickups
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Parcel Info</TableHead>
              <TableHead>Receiver Info</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Assigned At</TableHead>
              <TableHead>Others Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No parcels pending pickup
                </TableCell>
              </TableRow>
            ) : (
              parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  <TableCell>
                    <p className="font-medium">{parcel.parcelName}</p>
                    <p className="text-sm text-muted-foreground capitalize ">
                      {parcel.parcelType} · {parcel.parcelWeight} kg
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{parcel.receiverName}</p>
                      <p className="text-sm text-muted-foreground">
                        {parcel.receiverAddress}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {parcel.receiverDistrict}, {parcel.receiverRegion}
                      </p>
                      <p className="text-sm">{parcel.receiverContact}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">
                      {parcel.trackingId || "N/A"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium capitalize  text-sky-700">
                      {parcel.deliveryStatus?.replaceAll("-", " ") || "N/A"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">
                      {parcel.createdAt
                        ? new Date(parcel.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </span>
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    {parcel.deliveryStatus === "diver_assigned" ? (
                      <>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-sky-100 text-black hover:bg-sky-200"
                            onClick={() => handleAcceptedDelivery(parcel)}
                          >
                            Accept
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            // onClick={() => handleDelete(parcel._id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </>
                    ) : (
                      <span>Delivery Accepted</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-sky-100 text-black hover:bg-sky-200"
                      onClick={() =>
                        handleAcceptedDelivery(parcel, "parcel_picked_up")
                      }
                    >
                      Mark as Picked up
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleAcceptedDelivery(parcel, "parcel_delivered")
                      }
                    >
                      Mark as Delivered
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AssignDeliveries;
