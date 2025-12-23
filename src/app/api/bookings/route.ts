import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/bookings - Create new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, safariDate, peopleCount, packageId } = body;

    if (!name || !email || !safariDate || !peopleCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate total amount if package is selected
    let totalAmount = 0;
    if (packageId) {
      const pkg = await prisma.package.findUnique({
        where: { id: packageId },
      });

      if (pkg) {
        totalAmount = pkg.price * parseInt(peopleCount);
      }
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        safariDate: new Date(safariDate),
        peopleCount: parseInt(peopleCount),
        packageId: packageId || null,
        totalAmount,
        status: "PENDING",
      },
      include: {
        package: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET /api/bookings - Get all bookings (admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const bookings = await prisma.booking.findMany({
      where: status ? { status: status as "PENDING" | "PAID" } : {},
      include: {
        package: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
