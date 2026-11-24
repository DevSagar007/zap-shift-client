import {
  ArrowUpRight,
  MapPinned,
  PackageCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router";

const trackingSteps = [
  {
    title: "Pickup confirmed",
    desc: "We collect your parcel and attach a live tracking ID.",
    image: "/assets/tracking/transit-warehouse.png",
    icon: PackageCheck,
  },
  {
    title: "On the move",
    desc: "Follow every scan as your parcel moves through our hubs.",
    image: "/assets/tracking/02.png",
    icon: Truck,
  },
  {
    title: "Out for delivery",
    desc: "Get the final update when your rider is near the doorstep.",
    image: "/assets/tracking/03.png",
    icon: MapPinned,
  },
];

export default function Tracking() {
  return (
    <section id="tracking" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0B3F45]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0B3F45]" />
            Live parcel tracking
          </span>

          <h2 className="mt-6 text-[42px] font-bold leading-tight text-[#0B3F45]">
            Know where your parcel is, every step of the way.
          </h2>

          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#646A73]">
            Follow your parcel from pickup to doorstep with clear status
            updates, hub scans, and delivery progress in one simple tracking
            view.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E6EAEB] p-5">
              <PackageCheck className="h-6 w-6 text-[#0B3F45]" />
              <p className="mt-3 font-semibold text-[#0B3F45]">
                One tracking ID
              </p>
              <p className="mt-1 text-sm leading-6 text-[#646A73]">
                Use the ID from your order to see the latest update anytime.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6EAEB] p-5">
              <MapPinned className="h-6 w-6 text-[#0B3F45]" />
              <p className="mt-3 font-semibold text-[#0B3F45]">
                Nationwide updates
              </p>
              <p className="mt-1 text-sm leading-6 text-[#646A73]">
                Track local and nationwide parcels across every Zap Shift hub.
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/tracking"
            className="mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-[#063D42] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#052E33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#063D42]/40 focus-visible:ring-offset-2"
          >
            Track a Parcel
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[36px] bg-[#F4F5F7] p-6 sm:p-8">
          <div className="rounded-[28px] bg-[#063D42] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-lime-200/80">
                  Live delivery
                </p>
                <p className="mt-2 text-xl font-semibold">Parcel in transit</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-lime-300/15 px-3 py-1.5 text-xs font-semibold text-lime-200">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                Live
              </span>
            </div>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-2/3 rounded-full bg-lime-300" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-[26px] bg-white p-5 text-center shadow-sm"
                >
                  <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#F3F7F7]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-20 w-20 object-contain"
                    />
                    <span className="absolute -right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-lime-300 text-[#0B3F45]">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A9099]">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#0B3F45]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#646A73]">
                    {step.desc}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A9099]">
                Latest update
              </p>
              <p className="mt-1 text-sm font-bold text-[#0B3F45]">
                Parcel reached Dhaka hub
              </p>
            </div>
            <span className="rounded-full bg-[#EEF0FF] px-3 py-1.5 text-xs font-semibold text-[#0B3F45]">
              Updated now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
