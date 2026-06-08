"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const password = await bcryptjs_1.default.hash("yourpasswordhere", 12);
    const admin = await prisma.user.upsert({
        where: { email: "you@yoursite.com" },
        update: {},
        create: {
            email: "you@yoursite.com",
            password,
            name: "Your Name",
            role: "SUPER_ADMIN",
        },
    });
    console.log("✅ Admin created:", admin.email);
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map