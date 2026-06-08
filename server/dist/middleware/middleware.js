"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    const token = req.cookies?.token ??
        req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ error: "Not authenticated" });
        return;
    }
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
    req.user = decoded;
    next();
}
//# sourceMappingURL=middleware.js.map