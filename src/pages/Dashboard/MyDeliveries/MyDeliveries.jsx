import { useQuery } from "@tanstack/react-query";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { useEffect } from "react";
import {
  paginatedUrl,
  paginatedResult,
  useServerPagination,
} from "../../../hooks/useServerPagination";

function MyDeliveries() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { page, setPage, limit } = useServerPagination();

  useEffect(() => {
    setPage(1);
  }, [user?.email, setPage]);

  const { isPending, isFetching, error, data } = useQuery({
    queryKey: ["myDeliveries", user?.email, page, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        paginatedUrl(
          "/parcels",
          { riderEmail: user.email, deliveryStatus: "delivered" },
          { page, limit },
        ),
      );

      return paginatedResult(res, { page, limit });
    },
  });

  const items = data?.items ?? [];
  const meta = data?.meta ?? {
    total: 0,
    page,
    limit,
    totalPages: 1,
  };

  if (isPending || isFetching) return <DashboardSkeleton />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="mb-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        My Deliveries
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Parcel Info</TableHead>
              <TableHead>Receiver Info</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Delivered At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  You have no completed deliveries yet
                </TableCell>
              </TableRow>
            ) : (
              items.map((parcel) => (
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
                    <span className="font-medium capitalize ">
                      {parcel.deliveryStatus?.replaceAll("-", " ") || "N/A"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">
                      {parcel.deliveredAt
                        ? new Date(parcel.deliveredAt).toLocaleDateString(
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
}

export default MyDeliveries;
