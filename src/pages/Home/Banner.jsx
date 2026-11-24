import {
  ArrowUpRight,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router";

const highlights = [
  { icon: Truck, label: "Express in Dhaka" },
  { icon: MapPinned, label: "Nationwide coverage" },
  { icon: ShieldCheck, label: "Secure delivery" },
];

export default function Banner() {
  return (
    <section
      aria-label="Zap Shift parcel delivery"
      className="relative isolate overflow-hidden bg-[#052E33]"
    >
      <img
        src="/assets/banner/freepik-delivery-courier.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#052E33]/95 via-[#052E33]/75 to-[#052E33]/25" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#052E33] to-transparent" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[660px] lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-xs font-semibold capitalize text-lime-200">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
            Faster parcel delivery
          </div>

          <h1 className="mt-7 font-heading text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Send anywhere.
            <br />
            <span className="text-lime-300">Track every step.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200/90 sm:text-lg">
            Zap Shift makes local and nationwide parcel delivery simple. Book a
            pickup, follow your parcel in real time, and deliver with
            confidence.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/send-parcel"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-lime-300 px-6 text-sm font-semibold text-[#052E33] transition-colors duration-200 hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#052E33]"
            >
              Send a Parcel
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard/tracking"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 text-sm font-semibold text-[#052E33] transition-colors duration-200 hover:bg-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#052E33]"
            >
              Track Parcel
              <MapPinned className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-200/80">
                <Icon className="h-4 w-4 text-lime-300" strokeWidth={1.8} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ml-auto hidden w-72 rounded-2xl border border-white/15 bg-[#052E33]/70 p-5 backdrop-blur-sm xl:block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium capitalize text-slate-300">
              Live delivery
            </span>
            <PackageCheck className="h-5 w-5 text-lime-300" strokeWidth={1.8} />
          </div>
          <p className="mt-4 text-lg font-semibold text-white">Parcel in transit</p>
          <p className="mt-1 text-xs text-slate-300/80">
            Your parcel is moving to the next delivery hub.
          </p>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-lime-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
