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

function CompletedDeliveries() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    data: parcels = [],
  } = useQuery({
    queryKey: ["parcels", user?.email, "completedDeliveries"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );

      return res.data;
    },
  });

  // Calculate rider payout
  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.parcelCost * 0.8;
    }

    return parcel.parcelCost * 0.6;
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-5">
        Completed Deliveries: {parcels.length}
      </h2>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Parcel Info</TableHead>
              <TableHead>Receiver Info</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Completed At</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Payout</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-10 text-muted-foreground"
                >
                  No completed deliveries found
                </TableCell>
              </TableRow>
            ) : (
              parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  {/* Parcel Info */}
                  <TableCell>
                    <p className="font-medium">{parcel.parcelName}</p>

                    <p className="text-sm text-muted-foreground capitalize">
                      {parcel.parcelType} · {parcel.parcelWeight} kg
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

                  {/* Tracking Number */}
                  <TableCell>
                    <span className="font-medium">
                      {parcel.trackingId || "N/A"}
                    </span>
                  </TableCell>

                  {/* Delivery Status */}
                  <TableCell>
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Completed
                    </span>
                  </TableCell>

                  {/* Completed At */}
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

                  {/* Parcel Cost */}
                  <TableCell>
                    <span className="font-medium">
                      ৳{parcel.parcelCost || 0}
                    </span>
                  </TableCell>

                  {/* Rider Payout */}
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      ৳{calculatePayout(parcel).toFixed(2)}
                    </span>
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-sky-100 text-black hover:bg-sky-200"
                      // onClick={() => handleAcceptedDelivery(parcel)}
                    >
                      Cashout
                    </Button>
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

export default CompletedDeliveries;
