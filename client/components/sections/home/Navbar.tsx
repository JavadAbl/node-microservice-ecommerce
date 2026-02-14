"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Wrench, Phone, Menu } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            AutoCare<span className="text-orange-500">Pro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#home"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-gray-600">
            <Phone className="mr-2 h-4 w-4" />
            (555) 123-4567
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Book Now
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="#home"
                className="text-lg font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#services"
                className="text-lg font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                Services
              </Link>
              <Link
                href="#about"
                className="text-lg font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-lg font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
              <Separator className="my-4" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                Book Now
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
