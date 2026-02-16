import { Contact } from "../components/home/Contact";
import { Footer } from "../components/home/Footer";
import { Hero } from "../components/home/Hero";
import { HowItWorks } from "../components/home/HowItWorks";
import { Services } from "../components/home/Services";
import { Testimonials } from "../components/home/Testimonials";
import { WhyChooseUs } from "../components/home/WhyChooseUs";

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
