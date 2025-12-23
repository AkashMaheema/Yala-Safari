"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "🏆",
    title: "Expert Guides",
    description:
      "Experienced naturalists with deep knowledge of Yala's wildlife",
  },
  {
    icon: "🛡️",
    title: "Safety First",
    description:
      "Well-maintained vehicles and adherence to all safety protocols",
  },
  {
    icon: "⭐",
    title: "10+ Years Experience",
    description: "Over a decade of providing exceptional safari experiences",
  },
  {
    icon: "📸",
    title: "Photography Support",
    description: "Perfect positioning and timing for amazing wildlife shots",
  },
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            We&apos;re committed to providing unforgettable safari experiences
            with unmatched expertise and service
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-green-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
