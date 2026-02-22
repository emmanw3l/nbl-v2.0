// getPoemsByIndex.ts
import { prompts } from "../assets/prompts/2025/januaryPrompts";
import { febPrompts } from "../assets/prompts/2025/februaryPrompts";
import { aprilPrompts } from "../assets/prompts/2025/aprilPrompt";
import { mJPrompts } from "../assets/prompts/2025/mayJune";
import { julyPrompts } from "../assets/prompts/2025/july";
import { septemberPrompts } from "../assets/prompts/2025/septemberPrompt";

// 2024
import { octPrompts2024 } from "../assets/prompts/2024/october";
import { januaryPrompts2024 } from "../assets/prompts/2024/january";
import { februaryPrompts2024 } from "../assets/prompts/2024/february";
import { aprilPrompts2024 } from "../assets/prompts/2024/april";
import { marchPrompts2024 } from "../assets/prompts/2024/march";

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
export function promptIndexJanuary2024(indexes: number[]) {
  return indexes.map((index) => januaryPrompts2024[index]).filter(Boolean);
}
export function promptIndexFebruary2024(indexes: number[]) {
  return indexes.map((index) => februaryPrompts2024[index]).filter(Boolean);
}
export function promptIndexApril2024(indexes: number[]) {
  return indexes.map((index) => aprilPrompts2024[index]).filter(Boolean);
}
export function promptIndexMarch2024(indexes: number[]){
  return indexes.map((index) => marchPrompts2024[index]).filter(Boolean);
}