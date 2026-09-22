import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bike, MapPin, Phone } from "lucide-react";
import Swal from "sweetalert2";

const AssignRIders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  console.log("selectedParcel", selectedParcel);

  const {
    refetch,
    data: parcels = [],
    isLoading,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });

  // find riders
  const {
    data: riders = [],
    refetch: refetchRiders,
    isLoading: isRidersLoading,
  } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.receiverDistrict],
    queryFn: async () => {
      const params = {};

      params.status = "approved";
      params.workStatus = "available";

      if (selectedParcel?.receiverDistrict) {
        params.district = selectedParcel.receiverDistrict;
      }

      const res = await axiosSecure.get("/riders", { params });
      return res.data;
    },
    enabled: !!selectedParcel,
  });

  // handle assign rider
  const handleAssign = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      riderPhone: rider.phone,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
      deliveryStatus: "rider-assigned",
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSelectedParcel(null);
          refetch();
          refetchRiders();
          Swal.fire({
            title: "Success!",
            text: `${rider.name} assigned to ${selectedParcel.trackingId || "the parcel"}`,
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">
        Assign Riders {parcels.length}
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcel</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Assign Rider</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  Loading parcels...
                </TableCell>
              </TableRow>
            ) : parcels.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  No parcels waiting for a rider
                </TableCell>
              </TableRow>
            ) : (
              parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  {/* Parcel Info */}
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{parcel.parcelName}</p>

                      <p className="text-sm text-muted-foreground capitalize">
                        {parcel.parcelType}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Weight: {parcel.parcelWeight} kg
                      </p>
                    </div>
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

                  {/* Delivery Status */}
                  <TableCell>
                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium capitalize text-yellow-700">
                      {parcel.deliveryStatus?.replaceAll("-", " ") || "N/A"}
                    </span>
                  </TableCell>

                  {/* Payment Status */}
                  <TableCell>
                    <div className="space-y-1">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-700">
                        {parcel.paymentStatus || "N/A"}
                      </span>

                      <p className="text-sm font-medium">
                        ৳ {parcel.parcelCost || 0}
                      </p>
                    </div>
                  </TableCell>

                  {/* Created Time */}
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
                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-sky-100 text-black hover:bg-sky-200"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      Assign Rider
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedParcel}
        onOpenChange={(open) => !open && setSelectedParcel(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Assign Rider</DialogTitle>
            <DialogDescription>
              Choose a rider for{" "}
              <span className="font-medium text-foreground">
                {selectedParcel?.trackingId || selectedParcel?.parcelName}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {isRidersLoading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Loading riders...
              </p>
            ) : riders.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No approved riders available
              </p>
            ) : (
              riders.map((rider) => (
                <div
                  key={rider._id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="truncate font-medium">{rider.name}</p>

                    <p className="truncate text-sm text-muted-foreground">
                      {rider.email}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {rider.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="size-3" /> {rider.phone}
                        </span>
                      )}

                      {(rider.district || rider.region) && (
                        <span className="inline-flex items-center gap-1">
                           <MapPin className="size-3" /> {rider.district},{" "}
                          {rider.region}
                        </span>
                      )}

                      {rider.bikeBrandModelYear && (
                        <span className="inline-flex items-center gap-1">
                          <Bike className="size-3" /> {rider.bikeBrandModelYear}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="bg-green-100 text-green-700 hover:bg-green-200"
                    onClick={() => handleAssign(rider)}
                  >
                    Assign
                  </Button>
                </div>
              ))
            )}
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignRIders;
