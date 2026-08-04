import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", User.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`payments?.email${user.email}`);
      return res.data;
    },
  });

  console.log("payments", payments);
  // handleDelete
  const handleDelete = (id) => {
    console.log("click id", id);
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
          console.log(res.data);
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
      <div className="text-4xl font-extrabold mb-5">
        PaymentHistory {payments.length}
      </div>
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
            {payments.map((parcel) => (
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
                    {parcel.trackingId || "N/A"}
                  </span>
                </TableCell>

                {/* Payment */}
                <TableCell>
                  {parcel.paymentStatus === "paid" ? (
                    <span>৳ {parcel.amount} (Paid)</span>
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
      </div>
    </div>
  );
}

export default PaymentHistory;
