"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    image: "/images/expert-guide.jpg",
    title: "Expert Guides",
    description:
      "Experienced naturalists with deep knowledge of Yala's wildlife and ecosystem",
    stat: "15+ Certified Guides",
  },
  {
    image: "/images/safari-vehicle.jpg",
    title: "Safety First",
    description:
      "Well-maintained 4WD vehicles and strict adherence to all safety protocols",
    stat: "Zero Incidents",
  },
  {
    image: "/images/yala-leopard.jpg",
    title: "Proven Excellence",
    description:
      "Over a decade of providing exceptional safari experiences to thousands of visitors",
    stat: "10+ Years Experience",
  },
  {
    image: "/images/wildlife-photography.jpg",
    title: "Photography Support",
    description:
      "Perfect positioning, timing guidance, and equipment tips for stunning wildlife photography",
    stat: "Professional Tips Included",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-green-800 to-teal-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,219,226,0.1)_0%,transparent_50%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={
              isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 mx-auto bg-linear-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-2xl">
              🌟
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Why Choose
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
              Yala Safari
            </span>
          </h2>

          <div className="w-24 h-1 bg-linear-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>

          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            We&apos;re committed to providing unforgettable safari experiences
            with unmatched expertise, safety standards, and personalized service
            that sets us apart
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              {/* Card */}
              <div className="relative h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:border-emerald-400/50">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-emerald-400/20 to-transparent rounded-tr-2xl rounded-bl-full"></div>

                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 mx-auto w-48 h-48 relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover filter drop-shadow-lg"
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-emerald-100 mb-4 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Stat badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-semibold backdrop-blur">
                    {feature.stat}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-emerald-200">
            <span className="text-sm font-medium">
              Ready for your adventure?
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
