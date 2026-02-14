'use client'

import { Badge } from "@/components/ui/badge"
import { Award, Shield, Clock, CheckCircle, Settings, Users, Car } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Certified Mechanics",
    description: "Our team consists of ASE-certified professionals with years of experience in automotive repair."
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. We provide detailed quotes before any work begins."
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "We respect your time. Most services are completed same-day or within 24 hours."
  },
  {
    icon: CheckCircle,
    title: "Quality Parts Guarantee",
    description: "We use only high-quality OEM and premium aftermarket parts backed by our warranty."
  }
]

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              We&apos;re Different From Other Repair Shops
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              At AutoCare Pro, we combine expertise, transparency, and convenience
              to provide an unmatched automotive service experience.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                  <Settings className="h-10 w-10 mb-4" />
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-primary-foreground/20">Years Experience</p>
                </div>
                <div className="rounded-2xl bg-background p-6 text-foreground">
                  <Users className="h-10 w-10 mb-4" />
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-muted-foreground">Expert Mechanics</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl bg-muted p-6">
                  <Car className="h-10 w-10 mb-4 text-muted-foreground" />
                  <p className="text-3xl font-bold text-foreground">25K+</p>
                  <p className="text-muted-foreground">Cars Serviced</p>
                </div>
                <div className="rounded-2xl bg-primary/10 p-6">
                  <Award className="h-10 w-10 mb-4 text-primary" />
                  <p className="text-3xl font-bold text-foreground">100%</p>
                  <p className="text-muted-foreground"> Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
