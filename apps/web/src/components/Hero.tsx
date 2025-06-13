import React from "react";
import { ArrowRight, Badge } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FC2D35]/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-[#FC2D35]/20 text-[#FC2D35] border-[#FC2D35]/30">
            🎨 New Feature Available
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-[#FC2D35] to-red-400 bg-clip-text text-transparent block">
              Visual Content
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Effortlessly modify colors in your PNG images with pixel-perfect
            precision. Select, adjust, and replace any color to customize
            graphics, icons, or assets instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/editor">
              <Button
                size="lg"
                className="bg-[#FC2D35] hover:bg-red-600 text-white px-8 py-3 text-lg cursor-pointer"
              >
                Start Editing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg cursor-pointer"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
