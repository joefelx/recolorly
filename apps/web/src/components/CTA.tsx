import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who trust Recolorly for their color
            editing needs.
          </p>
          <Link href="/editor">
            <Button
              size="lg"
              className="bg-[#FC2D35] hover:bg-red-600 text-white px-12 py-4 text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
