const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    active: true,
  },
  {
    title: "Fulfillment Solution",
    desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    title: "Parcel Return",
    desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

export default function Services() {
  return (
    <section className="pb-24 bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto bg-[#063D42] rounded-[36px] px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-white text-5xl font-bold mb-6">Our Services</h2>

          <p className="text-white/80 text-lg leading-8">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className={`rounded-[28px] p-10 transition duration-300 hover:-translate-y-2
              ${item.active ? "bg-[#D7F75D]" : "bg-white"}`}
            >
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#EEF0FF] flex items-center justify-center">
                  <img src="/icons/service.png" alt="" className="w-10" />
                </div>
              </div>

              <h3 className="text-center text-[30px] leading-tight font-bold text-[#0B3F45] mb-5">
                {item.title}
              </h3>

              <p className="text-center text-[#62676E] leading-8 text-[17px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
