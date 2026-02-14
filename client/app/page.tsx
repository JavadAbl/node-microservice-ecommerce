import {
  Contact,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  Services,
  Testimonials,
  WhyChooseUs,
} from "@/components/sections/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
