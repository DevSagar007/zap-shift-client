import {
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

const makeIllustration = (content) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">${content}</svg>`
  )}`;

const businessSteps = [
  {
    step: "01",
    title: "Book a Parcel",
    desc: "Add parcel details, sender information, and receiver information in a few easy steps.",
    image: makeIllustration(
      '<rect x="28" y="28" width="64" height="72" rx="10" fill="#FFFFFF" stroke="#063D42" stroke-width="5"/><path d="M46 28v-7h28v7" stroke="#063D42" stroke-width="5" stroke-linecap="round"/><path d="M44 52h32M44 66h32M44 80h20" stroke="#063D42" stroke-width="5" stroke-linecap="round"/><circle cx="88" cy="88" r="14" fill="#D7F75D"/><path d="m82 88 4 4 8-9" stroke="#063D42" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
    ),
    icon: BriefcaseBusiness,
  },
  {
    step: "02",
    title: "Pay Securely",
    desc: "Complete your delivery payment through secure Stripe Checkout in BDT.",
    image: makeIllustration(
      '<rect x="24" y="30" width="72" height="48" rx="8" fill="#FFFFFF" stroke="#063D42" stroke-width="5"/><path d="M18 88h84" stroke="#063D42" stroke-width="5" stroke-linecap="round"/><path d="m52 46-10 8 10 8M68 46l10 8-10 8" stroke="#063D42" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="92" cy="30" r="10" fill="#D7F75D"/>'
    ),
    icon: Boxes,
  },
  {
    step: "03",
    title: "Track & Deliver",
    desc: "Riders pick up and deliver the parcel while you follow its progress online.",
    image: makeIllustration(
      '<path d="M28 86V66M50 86V50M72 86V58M94 86V34" stroke="#063D42" stroke-width="8" stroke-linecap="round"/><path d="M24 92h76" stroke="#063D42" stroke-width="5" stroke-linecap="round"/><path d="m28 48 20-16 18 10 28-24" stroke="#D7F75D" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M82 18h12v12" stroke="#D7F75D" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    ),
    icon: Globe2,
  },
];

export default function BusinessOverview() {
  return (
    <section id="business-overview" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-300/10 px-4 py-2 text-xs font-semibold capitalize text-[#0B3F45]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0B3F45]" />
            DELIVERY FOR PEOPLE & BUSINESSES
          </span>

          <h2 className="mt-6 text-[42px] font-bold leading-tight text-[#0B3F45]">
            One delivery platform for every parcel.
          </h2>

          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#646A73]">
            Zap Shift connects customers, riders, and administrators in one
            simple workflow—from booking and payment to pickup, delivery, and
            tracking.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E6EAEB] p-5">
              <BriefcaseBusiness className="h-6 w-6 text-[#0B3F45]" />
              <p className="mt-3 font-semibold text-[#0B3F45]">
                Simple Parcel Booking
              </p>
              <p className="mt-1 text-sm leading-6 text-[#646A73]">
                Enter sender and receiver details, choose delivery locations,
                and see the delivery charge before you confirm.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6EAEB] p-5">
              <ShieldCheck className="h-6 w-6 text-[#0B3F45]" />
              <p className="mt-3 font-semibold text-[#0B3F45]">
                Safe, Trackable Delivery
              </p>
              <p className="mt-1 text-sm leading-6 text-[#646A73]">
                Follow every important delivery event with a unique tracking
                ID and a clear status timeline.
              </p>
            </div>
          </div>

          <Link
            to="/#services"
            className="mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-[#063D42] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#052E33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#063D42]/40 focus-visible:ring-offset-2"
          >
            Explore Delivery Services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[36px] bg-[#F4F5F7] p-6 sm:p-8">
          <div className="rounded-[28px] bg-[#063D42] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium capitalize text-lime-200/80">
                  DELIVERY WORKFLOW
                </p>
                <p className="mt-2 text-xl font-semibold">
                  From booking to doorstep
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-lime-300/15 px-3 py-1.5 text-xs font-semibold text-lime-200">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                On the move
              </span>
            </div>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-3/4 rounded-full bg-lime-300" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {businessSteps.map((step) => {
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

                  <p className="mt-4 text-xs font-semibold capitalize text-[#8A9099]">
                    {step.step}
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
              <p className="text-xs font-semibold capitalize text-[#8A9099]">
                    DELIVERY UPDATE
              </p>
              <p className="mt-1 text-sm font-bold text-[#0B3F45]">
                Your parcel journey is easy to follow
              </p>
            </div>
            <span className="rounded-full bg-[#EEF0FF] px-3 py-1.5 text-xs font-semibold text-[#0B3F45]">
              Live tracking
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
