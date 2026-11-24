import {
  Banknote,
  BriefcaseBusiness,
  PackagePlus,
  Warehouse,
} from "lucide-react";

const works = [
  {
    title: "Book a Pickup or Drop-off",
    desc: "Create a parcel, choose pickup or drop-off, and get a tracking ID in seconds.",
    icon: PackagePlus,
  },
  {
    title: "Cash on Delivery",
    desc: "Let recipients pay when the parcel arrives with secure COD handling nationwide.",
    icon: Banknote,
  },
  {
    title: "Smart Delivery Hubs",
    desc: "Parcels move through our sorting hubs for faster routing and reliable last-mile delivery.",
    icon: Warehouse,
  },
  {
    title: "SME & Corporate Booking",
    desc: "Manage bulk shipments, recurring orders, and dedicated support from one dashboard.",
    icon: BriefcaseBusiness,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[#F4F5F7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-[42px] font-bold text-[#0B3F45]">
          How Zap Shift Works
        </h2>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {works.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[26px] bg-white p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F7F7]">
                  <Icon
                    className="text-[#0B3F45]"
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <h4 className="mb-4 text-[24px] font-bold leading-tight text-[#0B3F45]">
                  {item.title}
                </h4>

                <p className="text-[17px] leading-8 text-[#646A73]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
