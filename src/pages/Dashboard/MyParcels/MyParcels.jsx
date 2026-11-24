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
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/table-pagination";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useEffect } from "react";
import {
  paginatedUrl,
  paginatedResult,
  useServerPagination,
} from "../../../hooks/useServerPagination";

function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { page, setPage, limit } = useServerPagination();

  useEffect(() => {
    setPage(1);
  }, [user?.email, setPage]);

  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["myParcels", user?.email, page, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        paginatedUrl("/parcels", { email: user.email }, { page, limit }),
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

  // handleDelete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            // refech the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  return (
    <div>
      <h2 className="mb-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        My Parcels
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Parcel Info</TableHead>
              <TableHead>Recipient Info</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Payment Info</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((parcel) => (
              <TableRow key={parcel._id}>
                {/* Parcel Info */}
                <TableCell>
                  <p className="font-medium">{parcel.parcelName}</p>
                  <p className="text-sm text-muted-foreground">
                    {parcel.parcelType}
                  </p>
                </TableCell>

                {/* Receiver Info */}
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

                {/* Tracking */}
                <TableCell>
                  <span className="font-medium">
                  <Link to={`/parcel-track/${parcel.trackingId}`}> {parcel.trackingId || "N/A"}</Link>
                  </span>
                </TableCell>

                {/* deliveryStatus */}
                <TableCell>
                  <span className="font-medium">
                    {parcel.deliveryStatus || "N/A"}
                  </span>
                </TableCell>

                {/* Payment */}
                <TableCell>
                  {parcel.paymentStatus === "paid" ? (
                    <span>৳ {parcel.parcelCost} (Paid)</span>
                  ) : (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <Button size="sm" variant="destructive">
                        Pay now
                      </Button>
                    </Link>
                  )}
                </TableCell>

                {/* Action */}
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-sky-100 text-black hover:bg-sky-200"
                    >
                      View
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(parcel._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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

export default MyParcels;
