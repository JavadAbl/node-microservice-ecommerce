'use client'

import { Wrench, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AutoCare<span className="text-orange-500">Pro</span></span>
            </Link>
            <p className="mb-6">
              Professional car repair services with certified mechanics and transparent pricing. 
              Your trusted partner for all automotive needs.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#home" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="#services" className="hover:text-orange-500 transition-colors">Services</Link></li>
              <li><Link href="#about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="#services" className="hover:text-orange-500 transition-colors">Engine Repair</Link></li>
              <li><Link href="#services" className="hover:text-orange-500 transition-colors">Brake Service</Link></li>
              <li><Link href="#services" className="hover:text-orange-500 transition-colors">Oil Change</Link></li>
              <li><Link href="#services" className="hover:text-orange-500 transition-colors">Tire Services</Link></li>
              <li><Link href="#services" className="hover:text-orange-500 transition-colors">AC Repair</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>123 Main Street<br />Los Angeles, CA 90001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <span>hello@autocarepro.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-500 shrink-0" />
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} AutoCare Pro. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
