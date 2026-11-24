import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import Services from "./Services";
import BusinessOverview from "./BusinessOverview";
import FAQSection from "./FAQSection";

export default function Home() {
  return (
    <>
      <Banner />
      <BusinessOverview />
      <HowItWorks />
      <Services />
      <FAQSection />
    </>
  );
}
