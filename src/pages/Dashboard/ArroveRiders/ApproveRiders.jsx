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
import Swal from "sweetalert2";

function ApproveRiders() {
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    refetch,
    data: riders = [],
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleDelete = (rider) => {
    console.log("delete rider", rider);
  };

  // handle approved
  const handleApprove = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  // handle rejected
  const handleReject = (rider) => {
    console.log("reject rider", rider);
  };

  const updateRiderStatus = (rider, status) => {
    console.log("approve status", rider);
    const updateInfo = { status: "approved", email:rider.email};

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      console.log("PATCH response:", res.data);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: `Rider status is to set to ${status}`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">
        Approve Riders : {riders.length}
      </h2>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Rider Info</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>License / NID</TableHead>
              <TableHead>Bike Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {riders.map((rider) => (
              <TableRow key={rider._id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{rider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {rider.email}
                    </p>
                    <p className="text-sm">{rider.phone}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{rider.district}</p>
                    <p className="text-sm text-muted-foreground">
                      {rider.region}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">License:</span>{" "}
                      {rider.drivingLicenseNumber}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">NID:</span> {rider.nid}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{rider.bikeBrandModelYear}</p>
                    <p className="text-sm text-muted-foreground">
                      {rider.bikeRegistrationNumber}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      rider.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : rider.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {rider.status || "pending"}
                  </span>
                </TableCell>

                <TableCell>
                  {rider.createAt
                    ? new Date(rider.createAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-green-100 text-green-700 hover:bg-green-200"
                      onClick={() => handleApprove(rider)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      onClick={() => handleReject(rider)}
                    >
                      Reject
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(rider)}
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

export default ApproveRiders;
 