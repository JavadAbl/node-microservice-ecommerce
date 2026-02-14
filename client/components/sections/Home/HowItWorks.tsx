'use client'

import { Badge } from "@/components/ui/badge"
import { Wrench, Car, CalendarCheck, Truck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book Online",
    description: "Schedule your service appointment online in just a few clicks. Choose a time that works for you."
  },
  {
    number: "02",
    icon: Truck,
    title: "We Pick Up Your Car",
    description: "Our team will come to your location and safely transport your vehicle to our facility."
  },
  {
    number: "03",
    icon: Wrench,
    title: "Expert Repair",
    description: "Our certified mechanics diagnose and repair your vehicle with precision and care."
  },
  {
    number: "04",
    icon: Car,
    title: "Delivery Back to You",
    description: "We return your freshly serviced vehicle right to your doorstep, good as new."
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Easy as 1-2-3-4
          </h2>
          <p className="text-lg text-gray-400">
            We&apos;ve made car repair hassle-free with our streamlined process 
            designed around your convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-white">
                    <step.icon className="h-10 w-10" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-orange-400 text-sm font-bold border-2 border-orange-500">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mt-6 mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-gray-700" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
