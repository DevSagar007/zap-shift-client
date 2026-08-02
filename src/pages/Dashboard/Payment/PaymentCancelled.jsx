import { XCircle } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function PaymentCancelled() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* Cancel Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-14 w-14 text-red-600" />
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Payment Cancelled
        </h1>

        {/* Description */}
        <p className="mb-8 text-sm leading-6 text-slate-500">
          Your payment was cancelled and no charges were made.
          <br />
          You can return to your parcel and try again whenever you're ready.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard/my-parcels">
            <Button className="h-11 w-full bg-red-500 text-white hover:bg-red-600">
              Try Again
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
          Need help? Please contact our support team if you continue to
          experience issues.
        </p>
      </div>
    </div>
  );
}

export default PaymentCancelled;
