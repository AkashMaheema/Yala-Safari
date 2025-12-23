"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Yala National Park
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Yala National Park is the most visited and second largest national
              park in Sri Lanka, renowned for having one of the highest leopard
              densities in the world.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Spanning across 979 square kilometers, Yala is home to 44
              varieties of mammals and 215 bird species. Among its notable
              residents are leopards, elephants, sloth bears, and crocodiles.
            </p>
            <p className="text-lg text-gray-700">
              Our experienced guides will take you on an unforgettable journey
              through diverse ecosystems - from scrub jungles to lagoons,
              offering the adventure of a lifetime.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=2070"
              alt="Yala Wildlife"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
