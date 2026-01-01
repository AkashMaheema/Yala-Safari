"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  name: string;
  email: string;
  safariDate: string;
  peopleCount: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  package: {
    title: string;
  } | null;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  async function fetchBookings() {
    try {
      const url = statusFilter
        ? `/api/bookings?status=${statusFilter}`
        : "/api/bookings";
      const response = await fetch(url);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: (
            <svg
              className="w-3 h-3"
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
          ),
        };
      case "PAID":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        };
      case "CANCELLED":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
    }
  };

  const statusCounts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    paid: bookings.filter((b) => b.status === "PAID").length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Booking Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Track and manage all safari bookings
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {statusCounts.paid}
              </div>
              <div className="text-xs text-gray-500">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {statusCounts.pending}
              </div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            name: "Total Bookings",
            value: statusCounts.total,
            color: "from-blue-500 to-indigo-600",
            bgColor: "from-blue-50 to-indigo-50",
          },
          {
            name: "Pending",
            value: statusCounts.pending,
            color: "from-amber-500 to-orange-600",
            bgColor: "from-amber-50 to-orange-50",
          },
          {
            name: "Confirmed",
            value: statusCounts.paid,
            color: "from-emerald-500 to-teal-600",
            bgColor: "from-emerald-50 to-teal-50",
          },
          {
            name: "Cancelled",
            value: statusCounts.cancelled,
            color: "from-red-500 to-rose-600",
            bgColor: "from-red-50 to-rose-50",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-linear-to-br ${stat.bgColor} rounded-2xl p-6 shadow-sm border border-white/50`}
          >
            <div className="text-center">
              <div
                className={`text-3xl font-bold bg-linear-to-br ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600 mt-1">
                {stat.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Filter Bookings
          </h2>
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm text-gray-900"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            All Bookings ({bookings.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 font-medium">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No bookings found</p>
            <p className="text-gray-400 text-sm mt-1">
              Bookings will appear here once created
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Safari Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    People
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booked On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking, index) => {
                  const statusConfig = getStatusConfig(booking.status);
                  return (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50/50 transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-linear-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
                            {booking.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {booking.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {booking.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 font-medium">
                          {booking.package?.title || "No package"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 font-medium">
                          {formatDate(booking.safariDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {booking.peopleCount}{" "}
                          {booking.peopleCount === 1 ? "person" : "people"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">
                          ${booking.totalAmount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${statusConfig.color}`}
                        >
                          {statusConfig.icon}
                          <span className="ml-1">{booking.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {formatDate(booking.createdAt)}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Summary */}
      {bookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
            Booking Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {bookings.length}
              </p>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total People
              </p>
              <p className="text-3xl font-bold text-emerald-600">
                {bookings.reduce((sum, b) => sum + b.peopleCount, 0)}
              </p>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-amber-600">
                $
                {bookings.reduce((sum, b) => sum + b.totalAmount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
