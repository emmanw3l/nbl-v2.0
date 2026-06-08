"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTokenCookie = exports.setTokenCookie = exports.verifyToken = exports.signToken = void 0;
// server/src/utils/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES_IN ?? "7d";
const signToken = (payload) => jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: EXPIRES });
exports.signToken = signToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET);
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
exports.setTokenCookie = setTokenCookie;
const clearTokenCookie = (res) => {
    res.clearCookie("token");
};
exports.clearTokenCookie = clearTokenCookie;
//# sourceMappingURL=jwt.js.map