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
import Swal from "sweetalert2";

function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    data: parcels = [],
    refetch,
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

export default MyParcels;
