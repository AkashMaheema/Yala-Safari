import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["error"],
});

async function main() {
  console.log("🌱 Starting seed...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@yalasafari.com",
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log("✅ Default admin user created:");
  console.log("   Username: admin");
  console.log("   Password: admin123");
  console.log("   Email: admin@yalasafari.com");

  // Create some sample packages
  const packages = [
    {
      title: "Half Day Safari",
      description: "Experience Yala's wildlife in a 4-hour guided safari tour",
      duration: "4 hours",
      price: 50.0,
      imageUrl: "/images/half-day-safari.jpg",
    },
    {
      title: "Full Day Safari",
      description: "Complete day exploring Yala with lunch included",
      duration: "8 hours",
      price: 120.0,
      imageUrl: "/images/full-day-safari.jpg",
    },
    {
      title: "Photography Safari",
      description: "Specialized safari for wildlife photography enthusiasts",
      duration: "6 hours",
      price: 180.0,
      imageUrl: "/images/photography-safari.jpg",
    },
  ];

  for (const pkg of packages) {
    // Check if package with this title already exists
    const existingPackage = await prisma.package.findFirst({
      where: { title: pkg.title },
    });

    if (!existingPackage) {
      await prisma.package.create({
        data: pkg,
      });
    }
  }

  console.log("✅ Sample packages created");
  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
