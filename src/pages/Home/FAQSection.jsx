import { useState } from "react";

const faqData = [
  { question: "How do I send a parcel with Zap Shift?", answer: "Sign in, open Send Parcel, enter the parcel, sender, and receiver details, then submit the booking. You can review the delivery charge before payment." },
  { question: "How is the delivery charge calculated?", answer: "The charge depends on the parcel type, weight, and whether the sender and receiver are in the same or different districts. Prices are shown in BDT before you pay." },
  { question: "How can I track my parcel?", answer: "Open Parcel Tracking and enter the tracking ID from your booking. The timeline shows payment, rider assignment, pickup, and delivery events." },
  { question: "How do I pay for a delivery?", answer: "After creating a parcel, select Pay Now from My Parcels. Zap Shift opens a secure Stripe Checkout page and records the payment after confirmation." },
  { question: "How can I become a Zap Shift rider?", answer: "Open Be a Rider, complete the application with your identity, location, phone, and bike details, and wait for administrator approval." },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#eef0f0] px-4 py-24 sm:py-24">
      <div className="mx-auto max-w-[888px]">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-[32px] font-bold text-[#0B3F45] sm:text-[42px]">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-[760px] text-[16px] leading-8 text-[#646A73] sm:text-[17px]">Find quick answers about booking parcels, delivery charges, payments, tracking, and becoming a Zap Shift rider.</p>
        </div>
        <div className="space-y-[13px]">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={faq.question} className={`overflow-hidden rounded-[12px] border transition-all duration-300 ${isOpen ? "border-[#159eaa] bg-[#e5f2f3]" : "border-[#dedede] bg-white"}`}>
                <button type="button" onClick={() => setActiveIndex(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                  <span className="text-[18px] font-bold text-[#0B3F45] sm:text-[20px]">{faq.question}</span>
                  <span className="text-2xl text-[#0B3F45]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="px-5 pb-5 text-[16px] leading-7 text-[#646A73]">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
