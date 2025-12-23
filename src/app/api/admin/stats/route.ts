import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET() {
  try {
    const prisma = getPrismaClient();
    const [totalBookings, pendingBookings, paidBookings] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.findMany({ where: { status: "PAID" } }),
    ]);

    const totalRevenue = paidBookings.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0
    );

    return NextResponse.json({
      totalBookings,
      pendingBookings,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
