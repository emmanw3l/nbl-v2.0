import { JSX } from "react";
import {
  promptIndex,
  promptIndexFeb,
  promptIndexApril,
  promptIndexMJ,
  promptIndexJuly,
  promptIndexSeptember,
  promptIndexoctober2024,
  promptIndexJanuary2024,
  promptIndexFebruary2024,
  promptIndexApril2024,
  promptIndexMarch2024
} from "../components/promptIndexing";


// 2025
const januaryPrompts = promptIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const februaryPrompts = promptIndexFeb([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
]);
const aprilPrompts = promptIndexApril([0, 1, 2, 3, 4, 5, 6]);
const MJPrompts = promptIndexMJ([0,1,2,3,4])
const julyPrompts =promptIndexJuly([0,1,2,3,4,5])
const septemberPrompts = promptIndexSeptember([0,1,2,3,4,5,6,7])


// 2024
const octoberPrompts2024 = promptIndexoctober2024([0,1,2,3,4]);
const januaryPrompts2024 = promptIndexJanuary2024([0,1,2,3,4,5]);
const februaryPrompts2024 = promptIndexFebruary2024([0,1,2,3,4,5]);
const aprilPrompts2024 = promptIndexApril2024([0,1,2,3,4,5]);
const marchPrompts2024 = promptIndexMarch2024([0,1,2,3,4,5,6,7]);




export const allPrompts = [
  ...januaryPrompts,
  ...februaryPrompts,
  ...aprilPrompts,
  ...MJPrompts,
  ...julyPrompts,
  ...septemberPrompts,
  ...octoberPrompts2024,
  ...januaryPrompts2024,
  ...februaryPrompts2024,
  ...aprilPrompts2024,
  ...marchPrompts2024
];

export interface Prompt {
  id: number;
  title: string;
  author: string;
  month: string;
  year: string;
  content: JSX.Element[];
}


export function getRandomPrompt() {
  return allPrompts[Math.floor(Math.random() * allPrompts.length)];
}