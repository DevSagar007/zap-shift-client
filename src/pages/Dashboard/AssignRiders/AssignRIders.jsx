import { useEffect, useState } from "react";
import {
  ListSkeleton,
  TableRowsSkeleton,
} from "@/components/ui/dashboard-skeletons";
import { TablePagination } from "@/components/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
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
  const { page, setPage, limit } = useServerPagination();
  const {
    page: riderPage,
    setPage: setRiderPage,
    limit: riderLimit,
  } = useServerPagination();

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  useEffect(() => {
    setRiderPage(1);
  }, [selectedParcel?._id, setRiderPage]);

  const { refetch, data, isLoading, isFetching } = useQuery({
    queryKey: ["parcels", "pending-pickup", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        paginatedUrl(
          "/parcels",
          { deliveryStatus: "pending-pickup" },
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

  // find riders
  const {
    data: ridersData,
    refetch: refetchRiders,
    isLoading: isRidersLoading,
    isFetching: isRidersFetching,
  } = useQuery({
    queryKey: [
      "riders",
      "available",
      selectedParcel?.receiverDistrict,
      riderPage,
      riderLimit,
    ],
    queryFn: async () => {
      const params = {};

      params.status = "approved";
      params.workStatus = "available";

      if (selectedParcel?.receiverDistrict) {
        params.district = selectedParcel.receiverDistrict;
      }

      const res = await axiosSecure.get(
        paginatedUrl("/riders", params, {
          page: riderPage,
          limit: riderLimit,
        }),
      );
      return paginatedResult(res, { page: riderPage, limit: riderLimit });
    },
    enabled: !!selectedParcel,
  });

  const riders = ridersData?.items ?? [];
  const riderMeta = ridersData?.meta ?? {
    total: 0,
    page: riderPage,
    limit: riderLimit,
    totalPages: 1,
  };

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
      <h2 className="mb-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        Assign Riders
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
            {isLoading || isFetching ? (
              <TableRowsSkeleton rows={5} columns={7} />
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

                      <p className="text-sm text-muted-foreground capitalize ">
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
                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium capitalize  text-yellow-700">
                      {parcel.deliveryStatus?.replaceAll("-", " ") || "N/A"}
                    </span>
                  </TableCell>

                  {/* Payment Status */}
                  <TableCell>
                    <div className="space-y-1">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize  text-green-700">
                        {parcel.paymentStatus || "N/A"}
                      </span>

                      <p className="text-sm font-medium">
                        BDT {parcel.parcelCost || 0}
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

        <TablePagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          onPageChange={setPage}
        />
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
            {isRidersLoading || isRidersFetching ? (
              <ListSkeleton rows={4} />
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

          <TablePagination
            page={riderMeta.page}
            totalPages={riderMeta.totalPages}
            total={riderMeta.total}
            onPageChange={setRiderPage}
          />

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
