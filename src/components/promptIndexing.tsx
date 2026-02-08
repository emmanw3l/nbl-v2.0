// getPoemsByIndex.ts
import { prompts } from "../assets/prompts/2025/januaryPrompts";
import { febPrompts } from "../assets/prompts/2025/februaryPrompts";
import { aprilPrompts } from "../assets/prompts/2025/aprilPrompt";
import { mJPrompts } from "../assets/prompts/2025/mayJune";
import { julyPrompts } from "../assets/prompts/2025/july";
import { septemberPrompts } from "../assets/prompts/2025/septemberPrompt";

// 2024
import { octPrompts2024 } from "../assets/prompts/2024/october";

export function promptIndex(indexes: number[]) {
  return indexes.map((index) => prompts[index]).filter(Boolean);
}
export function promptIndexFeb(indexes: number[]) {
  return indexes.map((index) => febPrompts[index]).filter(Boolean);
}
export function promptIndexApril(indexes: number[]) {
  return indexes.map((index) => aprilPrompts[index]).filter(Boolean);
}
export function promptIndexMJ(indexes: number[]) {
  return indexes.map((index) => mJPrompts[index]).filter(Boolean);
}

export function promptIndexJuly(indexes: number[]) {
  return indexes.map((index) => julyPrompts[index]).filter(Boolean);
}
export function promptIndexSeptember(indexes: number[]) {
  return indexes.map((index) => septemberPrompts[index]).filter(Boolean);
}

// 2024

export function promptIndexoctober2024(indexes: number[]) {
  return indexes.map((index) => octPrompts2024[index]).filter(Boolean);
}
