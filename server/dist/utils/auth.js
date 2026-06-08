"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.getRole = getRole;
function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}
function getRole() {
    return getUser()?.role;
}
//# sourceMappingURL=auth.js.map