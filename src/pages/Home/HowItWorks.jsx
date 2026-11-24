import {
  Banknote,
  BriefcaseBusiness,
  PackagePlus,
  Warehouse,
} from "lucide-react";

const works = [
  {
    title: "Create Your Parcel",
    desc: "Enter sender and receiver details, choose the delivery locations, and submit your booking.",
    icon: PackagePlus,
  },
  {
    title: "Pay the Delivery Charge",
    desc: "Review the calculated cost and complete your payment securely through Stripe Checkout.",
    icon: Banknote,
  },
  {
    title: "Rider Pickup & Delivery",
    desc: "An approved rider accepts the task, picks up your parcel, and updates the delivery status.",
    icon: Warehouse,
  },
  {
    title: "Track Every Step",
    desc: "Use your tracking ID to follow parcel progress from booking to successful delivery.",
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
