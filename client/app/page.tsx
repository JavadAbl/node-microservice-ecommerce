import { Contact } from "./ui/Contact";
import { Footer } from "./ui/Footer";
import { Hero } from "./ui/Hero";
import { HowItWorks } from "./ui/HowItWorks";
import { Services } from "./ui/Services";
import { Testimonials } from "./ui/Testimonials";
import { WhyChooseUs } from "./ui/WhyChooseUs";

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
