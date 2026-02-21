import CreateVehicleServiceForm from "@/components/pages/vehicle-service/create-vehicle-service-form";
import { Contact } from "../../components/pages/home/Contact";
import { Footer } from "../../components/pages/home/Footer";
import { Hero } from "../../components/pages/home/Hero";
import { HowItWorks } from "../../components/pages/home/HowItWorks";
import { Services } from "../../components/pages/home/Services";
import { Testimonials } from "../../components/pages/home/Testimonials";
import { WhyChooseUs } from "../../components/pages/home/WhyChooseUs";

export default function Home() {
  return (
    <CreateVehicleServiceForm
      vehicleId={1}
      services={[{ name: "test service", id: 1 }]}
    />
  );
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
