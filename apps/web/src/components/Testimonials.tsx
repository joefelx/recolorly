import React, { useEffect, useState } from "react";

import Testimonial from "../../types/Testimonial";

import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const [testimonial, setTestimonial] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonial([
      {
        name: "Sarah Chen",
        role: "Graphic Designer",
        content:
          "Recolorly has revolutionized my workflow. What used to take hours in Photoshop now takes minutes.",
        rating: 5,
      },
      {
        name: "Mike Rodriguez",
        role: "Marketing Manager",
        content:
          "Perfect for quickly adapting brand assets. The precision is incredible and it's so easy to use.",
        rating: 5,
      },
      {
        name: "Emma Thompson",
        role: "Freelance Artist",
        content:
          "I love how I can experiment with different color schemes instantly. It's become an essential tool.",
        rating: 5,
      },
    ]);
  }, []);

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Users Say</h2>
          <p className="text-xl text-gray-300">
            Join thousands of satisfied creators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonial.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
