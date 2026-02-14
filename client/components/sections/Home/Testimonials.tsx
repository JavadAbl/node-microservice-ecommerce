'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Michael Johnson",
    role: "BMW 3 Series Owner",
    rating: 5,
    content: "Absolutely fantastic service! They diagnosed an engine issue that two other shops couldn't figure out. Fair pricing and excellent communication throughout the process.",
    initials: "MJ"
  },
  {
    name: "Sarah Williams",
    role: "Honda Accord Owner",
    rating: 5,
    content: "The pickup and delivery service is a game-changer. I didn't have to take time off work. My car was ready the same day and runs perfectly!",
    initials: "SW"
  },
  {
    name: "David Chen",
    role: "Tesla Model 3 Owner",
    rating: 5,
    content: "Professional, transparent, and efficient. They explained everything they did and showed me the old parts. Highly recommend for any car owner.",
    initials: "DC"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied 
            customers have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-orange-100 text-orange-600">
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
