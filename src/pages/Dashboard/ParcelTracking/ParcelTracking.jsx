import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function DashboardParcelTracking() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = trackingId.trim();
    if (value) {
      navigate(`/parcel-track/${encodeURIComponent(value)}`);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Track a Parcel</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter a tracking ID to see the latest delivery status and history.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="tracking-id"
              className="text-sm font-medium text-slate-700"
            >
              Tracking ID
            </label>
            <input
              id="tracking-id"
              value={trackingId}
              onChange={(event) => setTrackingId(event.target.value)}
              placeholder="e.g. ZS-1234567890"
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none transition focus:border-[#03373d]"
            />
          </div>
          <Button
            type="submit"
            className="h-12 rounded-xl bg-lime-300 px-6 text-sm font-semibold text-[#052E33] transition-colors duration-200 hover:bg-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Track Parcel
          </Button>
        </form>
      </div>
    </section>
  );
}
