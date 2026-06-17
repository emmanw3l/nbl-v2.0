import { febPrompts } from "../assets/prompts/2025/februaryPrompts";
import { aprilPrompts } from "../assets/prompts/2025/aprilPrompt";
import { mJPrompts } from "../assets/prompts/2025/mayJune";
import { julyPrompts } from "../assets/prompts/2025/july";
import { septemberPrompts } from "../assets/prompts/2025/septemberPrompt";



// 2026
import { januaryPrompts2026 } from "../assets/prompts/2026/january";




export function promptIndexJanuary2026(indexes: number[]){
  return indexes.map((index) => januaryPrompts2026[index]).filter(Boolean);
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

