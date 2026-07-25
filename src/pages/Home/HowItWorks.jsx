import { Truck, MapPin, Building2, PackageCheck } from "lucide-react";

const works = [
  {
    title: "Booking Pick & Drop",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[42px] font-bold text-[#0B3F45] mb-14">
          How it Works
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">
          {works.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[26px] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-[#F3F7F7] flex items-center justify-center mb-8">
                <Truck className="text-[#0B3F45]" size={28} strokeWidth={2} />
              </div>

              <h4 className="text-[24px] font-bold text-[#0B3F45] mb-4 leading-tight">
                {item.title}
              </h4>

              <p className="text-[#646A73] leading-8 text-[17px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
