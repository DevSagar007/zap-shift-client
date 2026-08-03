import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-lime-100">
          <CheckCircle2 className="h-14 w-14 text-lime-600" />
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Payment Successful!
        </h1>
        <p className="text-slate-600">
          Your transaction Id : {paymentInfo.transactionId}
        </p>
        <p className="text-slate-600">
          Your parcel tracking Id : {paymentInfo.trackingId}
        </p>

        {/* Description */}
        <p className="mb-8 text-sm leading-6 text-slate-500 mt-3">
          Thank you! Your payment has been completed successfully.
          <br />
          Your parcel is now confirmed and being processed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard/my-parcels">
            <Button className="h-11 w-full bg-lime-400 text-slate-900 hover:bg-lime-500">
              Go to My Parcels
            </Button>
          </Link>

          <Link to="/">
            <Button variant="outline" className="h-11 w-full border-slate-300">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-slate-400">
          A payment confirmation has been recorded successfully.
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
