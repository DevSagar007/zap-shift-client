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
import { Button } from "@/components/ui/button";

function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    data: parcels = [],
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log("parcels", parcels);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">
        Manage Parcel : {parcels.length}
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Parcel Info</TableHead>
              <TableHead>Recipient Info</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Payment Info</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels.map((parcel) => (
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
                    {parcel.trackingNumber || "N/A"}
                  </span>
                </TableCell>

                {/* Payment */}
                <TableCell>
                  <span>৳ {parcel.parcelCost} (Paid)</span>
                </TableCell>

                {/* Action */}
                <TableCell>
                  <Button
                    size="sm"
                    className="bg-sky-100 text-black hover:bg-sky-200"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyParcels;
