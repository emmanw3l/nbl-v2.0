"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const db_1 = __importDefault(require("../config/db"));
const hash_1 = require("../utils/hash");
const safeSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
    isActive: true,
    createdAt: true,
};
async function getUsers(_req, res, next) {
    try {
        const users = await db_1.default.user.findMany({
            orderBy: { createdAt: "desc" },
            select: safeSelect,
        });
        res.json({ users });
    }
    catch (err) {
        next(err);
    }
}
async function createUser(req, res, next) {
    try {
        const { email, password, name, role } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ error: "email, password, and name are required" });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ error: "Password must be at least 8 characters" });
            return;
        }
        const hashed = await (0, hash_1.hashPassword)(password);
        const user = await db_1.default.user.create({
            data: { email, password: hashed, name, role: role ?? "ADMIN" },
            select: safeSelect,
        });
        res.status(201).json({ user });
    }
    catch (err) {
        next(err);
    }
}
async function updateUser(req, res, next) {
    try {
        const userId = parseInt(req.params.id, 10);
        if (Number.isNaN(userId)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        const { name, email, role, isActive, password } = req.body;
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (email !== undefined)
            data.email = email;
        if (role !== undefined)
            data.role = role;
        if (isActive !== undefined)
            data.isActive = isActive;
        if (password)
            data.password = await (0, hash_1.hashPassword)(password);
        const user = await db_1.default.user.update({
            where: { id: userId },
            data,
            select: safeSelect,
        });
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
}
async function deleteUser(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: "Invalid user id" });
            return;
        }
        if (id === req.user.id) {
            res.status(400).json({ error: "You cannot delete your own account" });
            return;
        }
        await db_1.default.user.delete({ where: { id } });
        res.json({ message: "User deleted" });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=users.controller.js.map