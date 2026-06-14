// src/types/admin.ts

export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

export interface AdminUser {
  id:        number;
  email:     string;
  name:      string;
  role:      Role;
  isActive:  boolean;
  createdAt: string;
}

export interface Author {
  id:        number;
  name:      string;
  slug:      string;
  createdAt: string;
  _count?:   { prompts: number };
}

export interface Prompt {
  id:        number;
  title:     string;
  theme?:    string;
  content:   string;
  month:     number;
  year:      number;
  slug:      string;
  authorId:  number;
  author?:   Author;
  createdAt: string;
  updatedAt: string;
}

// ── Award types — now relational ──────────────────────────────────────────

export interface AwardNominee {
  id:       number;
  authorId: number;
  author:   { id: number; name: string; slug: string };
  work:     string;
  isWinner: boolean;
}

export interface Award {
  id:          number;
  description: string;
  category:    string;
  year:        number;
  nominees:    AwardNominee[];
  createdAt:   string;
}

export interface Stats {
  totalPrompts:  number;
  totalAuthors:  number;
  totalAwards:   number;
  totalUsers:    number;
  promptsByYear: { year: number; count: number }[];
}