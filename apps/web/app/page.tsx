"use client";

import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import { FEATURES } from "@/constants/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white grid-pattern-animated">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Demo Section */}
      <VideoCard />

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
            {FEATURES.map((feature, index) => (
              <Feature
                key={index}
                icon={<feature.icon className="w-6 h-6 text-[#FC2D35]" />}
                title={feature.title}
                desc={feature.desc}
              />
            ))}
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
