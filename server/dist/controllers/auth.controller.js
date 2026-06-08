"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
exports.me = me;
const db_1 = __importDefault(require("../config/db"));
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password required" });
            return;
        }
        const user = await db_1.default.user.findUnique({ where: { email } });
        if (!user || !user.isActive) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const valid = await (0, hash_1.comparePassword)(password, user.password);
        if (!valid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = (0, jwt_1.signToken)({ id: user.id, email: user.email, role: user.role });
        (0, jwt_1.setTokenCookie)(res, token);
        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    }
    catch (err) {
        next(err);
    }
}
function logout(_req, res) {
    (0, jwt_1.clearTokenCookie)(res);
    res.json({ message: "Logged out" });
}
async function me(req, res, next) {
    try {
        const user = await db_1.default.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, role: true },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=auth.controller.js.map