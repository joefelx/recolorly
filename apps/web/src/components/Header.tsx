import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { ArrowLeft, ChevronDown } from "lucide-react";
import Logo from "../../public/assets/Logo.png";

export default function Header({ subPage = false }: { subPage?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center space-x-4 cursor-pointer">
              <div className="w-8 h-8 bg-[#FC2D35] rounded-lg flex items-center justify-center">
                <Image src={Logo} alt="Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Recolorly</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>

            {subPage ? (
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            ) : (
              <Link href="/editor">
                <Button className="bg-[#FC2D35] hover:bg-red-600 text-white cursor-pointer">
                  Start Editing
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
