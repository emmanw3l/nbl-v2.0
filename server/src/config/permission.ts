export const permissions = {
  SUPER_ADMIN: [
    "create_prompt",
    "read_prompt",
    "update_prompt",
    "delete_prompt",
    "manage_users",
  ],

  ADMIN: [
    "create_prompt",
    "read_prompt",
    "update_prompt",
    "delete_prompt",
  ],

  EDITOR: [
    "create_prompt",
    "read_prompt",
    "update_prompt",
  ],
} as const;

export type Role = keyof typeof permissions;