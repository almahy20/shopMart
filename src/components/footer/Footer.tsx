import Link from "next/link";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4 ">
      <div className=" grid grid-cols-6  max-w-5xl mx-auto">
        <div className="space-y-3 col-span-6 md:col-span-2  sm:col-span-6 pb-4 ">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-lg">
              S
            </div>
            <h2 className="text-xl font-bold text-gray-900">shopMart</h2>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your one-stop destination <br /> for the latest technology, fashion,
            and lifestyle products.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <MapPin className="w-3 h-3 mt-0.5 " />
              <span>123 Shop Street, Octoper City, DC 12345</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="w-3 h-3 " />
              <span>(+20) 01093333333</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="w-3 h-3 " />
              <span>support@shopmart.com</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 col-span-6 sm:col-span-3  md:col-span-1 pb-4   ">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            SHOP
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Fashion
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home & Garden
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sports
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Deals
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 col-span-6 sm:col-span-3  md:col-span-1 pb-4   ">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            CUSTOMER SERVICE
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Track Your Order
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Size Guide
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 col-span-6 sm:col-span-3  md:col-span-1 pb-4   ">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            ABOUT
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                About shopmart
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Investor Relations
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sustainability
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 col-span-6 sm:col-span-3  md:col-span-1 pb-4   ">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            POLICIES
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
