import React from "react";

export default function Stats() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-4xl font-bold text-[#FC2D35] mb-2">10K+</div>
            <div className="text-gray-300">Images Processed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FC2D35] mb-2">99.9%</div>
            <div className="text-gray-300">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FC2D35] mb-2">5★</div>
            <div className="text-gray-300">User Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FC2D35] mb-2">24/7</div>
            <div className="text-gray-300">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
