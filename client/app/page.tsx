import { Contact } from "../components/pages/home/Contact";
import { Footer } from "../components/pages/home/Footer";
import { Hero } from "../components/pages/home/Hero";
import { HowItWorks } from "../components/pages/home/HowItWorks";
import { Services } from "../components/pages/home/Services";
import { Testimonials } from "../components/pages/home/Testimonials";
import { WhyChooseUs } from "../components/pages/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
