"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=2076",
    alt: "Leopard in Yala",
  },
  {
    url: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=2070",
    alt: "Elephants",
  },
  {
    url: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=2070",
    alt: "Bird watching",
  },
  {
    url: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=2076",
    alt: "Safari sunset",
  },
  {
    url: "https://media.istockphoto.com/id/1489566726/photo/leopard-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=kIHqKhwO_JCq94l7yg8zkZuY-v-BbiaaRxr-giy97w4=",
    alt: "Wildlife spotting",
  },
  {
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071",
    alt: "Yala landscape",
  },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600">
            Glimpses of the incredible wildlife and landscapes at Yala
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
