import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

function Payment() {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  console.log(parcelId);
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    <div>Payment Loading</div>;
  }

  return <div>Payment{parcel?.parcelName}</div>;
}

export default Payment;
