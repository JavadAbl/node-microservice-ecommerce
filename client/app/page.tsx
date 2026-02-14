import {
  Contact,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  Services,
  Testimonials,
  WhyChooseUs,
} from "@/components/sections/Home";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
