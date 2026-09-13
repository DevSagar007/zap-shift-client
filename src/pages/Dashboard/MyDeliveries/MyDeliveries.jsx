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

function MyDeliveries() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    data: parcels = [],
  } = useQuery({
    queryKey: ["myDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?riderEmail=${user.email}&deliveryStatus=delivered`,
      );
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">
        My Deliveries : {parcels.length}
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
            {parcels.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  You have no completed deliveries yet
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
      </div>
    </div>
  );
}

export default MyDeliveries;
