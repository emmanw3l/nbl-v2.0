// src/utils/permissions.ts

export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

// ── Which roles can access each page ──────────────────────────────────────
export const PAGE_ACCESS: Record<string, Role[]> = {
  dashboard: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  prompts:   ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  authors:   ["SUPER_ADMIN", "ADMIN"],
  awards:    ["SUPER_ADMIN", "ADMIN"],
  users:     ["SUPER_ADMIN"],
};

// ── Which roles can perform each action ───────────────────────────────────
export const ACTION_ACCESS: Record<string, Role[]> = {
  createPrompt:  ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  editPrompt:    ["SUPER_ADMIN", "ADMIN", "EDITOR"],
  deletePrompt:  ["SUPER_ADMIN", "ADMIN"],
  createAuthor:  ["SUPER_ADMIN", "ADMIN"],
  editAuthor:    ["SUPER_ADMIN", "ADMIN"],
  deleteAuthor:  ["SUPER_ADMIN", "ADMIN"],
  createAward:   ["SUPER_ADMIN", "ADMIN"],
  editAward:     ["SUPER_ADMIN", "ADMIN"],
  deleteAward:   ["SUPER_ADMIN", "ADMIN"],
  createUser:    ["SUPER_ADMIN"],
  editUser:      ["SUPER_ADMIN"],
  deleteUser:    ["SUPER_ADMIN"],
};

export function canAccessPage(role: Role | null, page: string): boolean {
  if (!role) return false;
  return PAGE_ACCESS[page]?.includes(role) ?? false;
}

export function canDoAction(role: Role | null, action: string): boolean {
  if (!role) return false;
  return ACTION_ACCESS[action]?.includes(role) ?? false;
}