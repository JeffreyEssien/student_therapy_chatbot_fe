"use client";

import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 animate-pulse" /> Chatmate
          </h3>
          <p className="text-sm text-gray-400">
            Empowering student mental health with AI-driven therapy, available 24/7.
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Features", "Contact", "Privacy Policy"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 hover:underline transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>support@chatmate.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+234 943 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Babcock university Ilishan-Remo</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <p>&copy; {new Date().getFullYear()} Chatmate. All rights reserved.</p>
      </div>
    </footer>
  );
}