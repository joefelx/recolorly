import React from "react";
import { Button } from "./ui/button";
import { Github, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/assets/Logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#FC2D35] rounded-lg flex items-center justify-center">
                <Image src={Logo} alt="Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Recolorly</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional color editing made simple and accessible for
              everyone.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Recolorly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
