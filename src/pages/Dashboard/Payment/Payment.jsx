import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@base-ui/react";

function Payment() {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  console.log(parcelId);
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        cost: parcel.parcelCost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
      };

      console.log(paymentInfo);

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      console.log(res.data);

      // Stripe Checkout URL এ redirect
      if (res.data.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <div>Payment Loading</div>;
  }

  return (
    <div>
      Please pay ${parcel.parcelCost} for: {parcel?.parcelName}
      <br />
      <Button onClick={handlePayment} size="sm" variant="destructive">
        Pay now
      </Button>
    </div>
  );
}

export default Payment;
