import { useQuery } from "@tanstack/react-query";
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

function RiderParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    data: parcels = [],
  } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?riderEmail=${user.email}`);
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">
        Assigned Parcels : {parcels.length}
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Parcel Info</TableHead>
              <TableHead>Receiver Info</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Payment Info</TableHead>
              <TableHead>Assigned At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No parcels assigned to you yet
                </TableCell>
              </TableRow>
            ) : (
              parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  <TableCell>
                    <p className="font-medium">{parcel.parcelName}</p>
                    <p className="text-sm text-muted-foreground capitalize">
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
                    <span className="font-medium capitalize">
                      {parcel.deliveryStatus?.replaceAll("-", " ") || "N/A"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span>৳ {parcel.parcelCost || 0}</span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">
                      {parcel.assignedAt
                        ? new Date(parcel.assignedAt).toLocaleDateString(
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
      </div>
    </div>
  );
}

export default RiderParcels;
