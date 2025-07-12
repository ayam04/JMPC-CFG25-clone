import {
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-50 text-gray-800 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">
                ImpactOrg
              </span>
            </div>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Creating positive change around the world through community-driven
              initiatives and sustainable solutions.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Facebook
                className="text-gray-500 hover:text-orange-600 cursor-pointer transition-colors duration-200"
                size={20}
              />
              <Twitter
                className="text-gray-500 hover:text-orange-600 cursor-pointer transition-colors duration-200"
                size={20}
              />
              <Instagram
                className="text-gray-500 hover:text-orange-600 cursor-pointer transition-colors duration-200"
                size={20}
              />
              <Linkedin
                className="text-gray-500 hover:text-orange-600 cursor-pointer transition-colors duration-200"
                size={20}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base block py-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base block py-1"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base block py-1"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base block py-1"
                >
                  Get Involved
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
              Contact Info
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <Mail
                  size={16}
                  className="text-gray-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-600 text-sm sm:text-base break-all">
                  contactvidyoday@gmail.com
                </span>
                <span className="text-gray-600 text-sm sm:text-base break-all">
                  vinayakmali90@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone
                  size={16}
                  className="text-gray-500 mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="text-gray-600 text-sm sm:text-base">
                  +91 9420608084
                </span>
              </div>
              <div className="flex items-center">
                <MapPin
                  size={16}
                  className="text-gray-500 mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="text-gray-600 text-sm sm:text-base">
                  Abdullat village, Tal. Shirol, Dist. Kolhapur, Maharashtra
                  416115
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-orange-200 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Copyright © 2025 Vidyoday Muktangan Parivar Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
