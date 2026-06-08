"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const permission_1 = require("../config/permission");
function authorize(permission) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        const role = req.user.role;
        const userPermissions = permission_1.permissions[role];
        if (!userPermissions.includes(permission)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
}
//# sourceMappingURL=authorize.js.map