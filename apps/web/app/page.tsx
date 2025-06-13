"use client";

import { Palette, Zap, Shield } from "lucide-react";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create stunning visual content with
              professional-grade color editing tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Feature
              icon={<Palette className="w-6 h-6 text-[#FC2D35]" />}
              title=" Precise Color Selection"
              desc="   Click on any pixel to select its exact color for replacement
                  with advanced tolerance controls."
            />
            <Feature
              icon={<Zap className="w-6 h-6 text-[#FC2D35]" />}
              title="Lightning Fast Processing"
              desc="Real-time color replacement with instant preview. No waiting,
                  no delays - see changes immediately."
            />
            <Feature
              icon={<Shield className="w-6 h-6 text-[#FC2D35]" />}
              title="Privacy First"
              desc="All processing happens locally in your browser. Your images
                  never leave your device."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}

      {/* Testimonials */}

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
