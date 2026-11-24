import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Package,
  ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function Payment() {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    isFetching,
    isError,
    data: parcel,
  } = useQuery({
    queryKey: ["parcels", parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const amount = Number(parcel?.parcelCost) || 0;

  const handlePayment = async () => {
    try {
      const parcelInfo = {
        cost: parcel.parcelCost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
        trackingId: parcel.trackingId,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        parcelInfo,
      );

      if (res.data.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  if (isLoading || isFetching) {
    return <DashboardSkeleton />;
  }

  if (isError || !parcel) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Payment details unavailable
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            We couldn’t load this parcel. Please try again.
          </p>
          <Link
            to="/dashboard/my-parcels"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-lime-300 px-5 font-semibold text-[#052E33] hover:bg-lime-400"
          >
            Back to parcels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        to="/dashboard/my-parcels"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to parcels
      </Link>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-lime-100 text-[#03373d]">
            <CreditCard className="size-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Complete your payment
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review your parcel details before continuing to secure checkout.
          </p>
        </div>

        <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#03373d] shadow-sm">
              <Package className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase text-slate-500">
                Parcel
              </p>
              <p className="truncate text-base font-semibold text-slate-900">
                {parcel.parcelName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Tracking ID:{" "}
                <span className="font-medium text-slate-700">
                  {parcel.trackingId}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
            <span className="text-sm font-medium text-slate-500">
              Amount due
            </span>
            <span className="text-3xl font-bold text-[#03373d]">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handlePayment}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 text-sm font-semibold text-[#052E33] hover:bg-lime-400"
        >
          Pay Now
          <ArrowRight className="size-4" />
        </Button>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="size-4 text-[#03373d]" />
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}

export default Payment;
