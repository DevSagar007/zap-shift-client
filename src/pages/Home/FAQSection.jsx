import { useState } from "react";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, the posture corrector is designed to accommodate different body types. However, proper sizing and adjustment are important for comfortable use.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "A posture corrector may help encourage better posture by providing gentle support. Results can vary depending on individual needs and usage.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some smart posture correctors include vibration alerts that notify you when you start slouching, helping you become more aware of your posture.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can subscribe to our back-in-stock notifications. We will notify you via email when the product becomes available again.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-[#eef0f0] px-4 py-24 sm:py-24">
      <div className="mx-auto max-w-[888px]">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-[32px] font-bold text-[#0B3F45] sm:text-[42px]">
            Frequently Asked Question
          </h2>

          <p className="mx-auto max-w-[760px] text-[16px] leading-8 text-[#646A73] sm:text-[17px]">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        <div className="space-y-[13px]">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-[12px] border transition-all duration-300 ${
                  isOpen
                    ? "border-[#159eaa] bg-[#e5f2f3]"
                    : "border-[#dedede] bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                >
                  <span className="text-[18px] font-bold text-[#0B3F45] sm:text-[20px]">
                    {faq.question}
                  </span>

                  <svg
                    className={`size-5 shrink-0 text-[#0B3F45] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`mx-6 border-t border-[#c9e0e2] px-0 text-[16px] leading-8 text-[#646A73] transition-all duration-300 sm:mx-7 sm:text-[17px] ${
                        isOpen ? "py-5 opacity-100" : "py-0 opacity-0"
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
