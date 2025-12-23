import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";

// PUT /api/packages/[id] - Update package
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrismaClient();
    const body = await request.json();
    const { title, description, duration, price, imageUrl, isActive } = body;

    const updatedPackage = await prisma.package.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(duration && { duration }),
        ...(price && { price: parseFloat(price) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}

// DELETE /api/packages/[id] - Soft delete package
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrismaClient();
    await prisma.package.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
}
