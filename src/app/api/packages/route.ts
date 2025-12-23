import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/packages - Get all active packages
export async function GET() {
  try {
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log(
      "DATABASE_URL prefix:",
      process.env.DATABASE_URL?.substring(0, 20)
    );

    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      {
        error: "Failed to fetch packages",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/packages - Create new package (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, duration, price, imageUrl } = body;

    if (!title || !description || !duration || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPackage = await prisma.package.create({
      data: {
        title,
        description,
        duration,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}
