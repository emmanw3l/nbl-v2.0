import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("yourpasswordhere", 12);

  const admin = await prisma.user.upsert({
    where:  { email: "you@yoursite.com" },
    update: {},
    create: {
      email:    "you@yoursite.com",
      password,
      name:     "Your Name",
      role:     "SUPER_ADMIN",
    },
  });

  console.log("✅ Admin created:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());