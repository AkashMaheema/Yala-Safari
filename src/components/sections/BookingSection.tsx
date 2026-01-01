"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Package {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  imageUrl: string | null;
}

export default function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    safariDate: "",
    numberOfPeople: "1",
    packageId: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const response = await fetch("/api/packages");
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          safariDate: formData.safariDate,
          peopleCount: formData.numberOfPeople,
          packageId: formData.packageId || null,
        }),
      });

      if (response.ok) {
        const booking = await response.json();
        toast.success("Booking Successful!");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          safariDate: "",
          numberOfPeople: "1",
          packageId: "",
        });
      } else {
        const error = await response.json();
        toast.error("Booking Failed!");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Booking Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Safari
          </h2>
          <p className="text-lg text-gray-600">
            Fill in the details below and we&apos;ll get back to you shortly
          </p>
        </motion.div>

        <div
          className={`transition-all duration-500 ease-in-out ${
            formData.packageId
              ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
              : "flex justify-center"
          }`}
        >
          {/* Booking Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className={`bg-gray-50 p-8 rounded-lg shadow-lg transition-all duration-500 ${
              formData.packageId ? "w-full" : "w-full max-w-3xl"
            }`}
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="safariDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Safari Date *
                </label>
                <input
                  type="date"
                  id="safariDate"
                  name="safariDate"
                  value={formData.safariDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="packageId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Package (Optional)
                </label>
                <select
                  id="packageId"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-gray-900"
                >
                  <option value="">No specific package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} - ${pkg.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="numberOfPeople"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of People *
                </label>
                <select
                  id="numberOfPeople"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-gray-900"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Booking Request"}
              </button>
            </div>
          </motion.form>

          {/* Selected Package Display - Only show when package is selected */}
          {formData.packageId && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="bg-green-50 p-8 rounded-lg shadow-lg border border-green-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Summary
              </h3>

              <div className="space-y-4">
                {(() => {
                  const selectedPackage = packages.find(
                    (pkg) => pkg.id === formData.packageId
                  );
                  if (!selectedPackage) return null;

                  const numPeople = parseInt(formData.numberOfPeople) || 1;
                  const totalPrice = selectedPackage.price * numPeople;

                  return (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-lg border border-green-200"
                      >
                        {/* Package Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">
                              {selectedPackage.title}
                            </h4>
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center text-green-600">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-sm font-medium">
                                  {selectedPackage.duration}
                                </span>
                              </div>
                              <div className="flex items-center text-green-600">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-sm font-medium">
                                  ${selectedPackage.price} per person
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                              {selectedPackage.description}
                            </p>

                            {/* Package Features */}
                            <div className="mb-4">
                              <h5 className="text-sm font-semibold text-gray-900 mb-2">
                                What's Included:
                              </h5>
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  "Experienced safari guide",
                                  "Wildlife spotting opportunities",
                                  "Refreshments included",
                                  "Safe and comfortable vehicle",
                                  "Photography assistance",
                                  "Wildlife tracking equipment",
                                ].map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center text-sm text-gray-600"
                                  >
                                    <svg
                                      className="w-3 h-3 text-green-500 mr-2 shrink-0"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Pricing Summary */}
                          <div className="ml-6 text-right bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="text-sm text-gray-600 mb-1">
                              Total for {numPeople}{" "}
                              {numPeople === 1 ? "person" : "people"}
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-2">
                              ${totalPrice}
                            </div>
                            <div className="text-xs text-gray-500">
                              ${selectedPackage.price} × {numPeople}
                            </div>
                          </div>
                        </div>

                        {/* Package Image */}
                        {selectedPackage.imageUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={selectedPackage.imageUrl}
                              alt={selectedPackage.title}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        {formData.fullName && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium text-gray-900">
                              {formData.fullName}
                            </span>
                          </div>
                        )}
                        {formData.email && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-gray-900">
                              {formData.email}
                            </span>
                          </div>
                        )}
                        {formData.safariDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium text-gray-900">
                              {new Date(
                                formData.safariDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">People:</span>
                          <span className="font-medium text-gray-900">
                            {numPeople}
                          </span>
                        </div>
                      </motion.div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
