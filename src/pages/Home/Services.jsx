import {
  Banknote,
  Boxes,
  BriefcaseBusiness,
  Globe2,
  RotateCcw,
  Truck,
} from "lucide-react";

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: Truck,
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: Globe2,
    active: true,
  },
  {
    title: "Fulfillment Solution",
    desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: Boxes,
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: Banknote,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate services which includes warehouse and inventory management support.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Parcel Return",
    desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: RotateCcw,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-[#F4F5F7] pb-24">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-[#063D42] px-8 py-24">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">Our Services</h2>

          <p className="text-lg leading-8 text-white/80">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-[28px] p-10 transition duration-300 hover:-translate-y-2 ${
                  item.active ? "bg-[#D7F75D]" : "bg-white"
                }`}
              >
                <div className="mb-8 flex justify-center">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full ${
                      item.active ? "bg-white/60" : "bg-[#EEF0FF]"
                    }`}
                  >
                    <Icon className="h-10 w-10 text-[#0B3F45]" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="mb-5 text-center text-[30px] font-bold leading-tight text-[#0B3F45]">
                  {item.title}
                </h3>

                <p className="text-center text-[17px] leading-8 text-[#62676E]">
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
