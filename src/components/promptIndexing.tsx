// getPoemsByIndex.ts
import { prompts } from "../prompts/2025/januaryPrompts";
import { febPrompts } from "../prompts/2025/februaryPrompts";
import { aprilPrompts } from "../prompts/2025/aprilPrompt";
import { mJPrompts } from "../prompts/2025/mayJune";
import { julyPrompts } from "../prompts/2025/july";

export function promptIndex(indexes: number[]) {
  return indexes.map(index => prompts[index]).filter(Boolean);
}
export function promptIndexFeb(indexes: number[]) {
  return indexes.map(index => febPrompts[index]).filter(Boolean);
}
export function promptIndexApril(indexes: number[]){
  return indexes.map(index => aprilPrompts[index]).filter(Boolean);
}
export function promptIndexMJ(indexes: number[]){
  return indexes.map(index => mJPrompts[index]).filter(Boolean);
}

export function promptIndexJuly(indexes: number[]){
  return indexes.map(index => julyPrompts[index]).filter(Boolean);
}