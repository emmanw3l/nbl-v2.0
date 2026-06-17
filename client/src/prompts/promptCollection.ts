import { JSX } from "react";
import {

  promptIndexFeb,
  promptIndexApril,
  promptIndexMJ,
  promptIndexJuly,
  promptIndexSeptember,

  promptIndexJanuary2026,
} from "../components/promptIndexing";


// 2026
const januaryPrompts2026 = promptIndexJanuary2026([0,1,2,3,4]);


// 2025
const februaryPrompts = promptIndexFeb([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
]);
const aprilPrompts = promptIndexApril([0, 1, 2, 3, 4, 5, 6]);
const MJPrompts = promptIndexMJ([0,1,2,3,4])
const julyPrompts =promptIndexJuly([0,1,2,3,4,5])
const septemberPrompts = promptIndexSeptember([0,1,2,3,4,5,6,7])


// 2024




export const allPrompts = [
  ...januaryPrompts2026,
  ...februaryPrompts,
  ...aprilPrompts,
  ...MJPrompts,
  ...julyPrompts,
  ...septemberPrompts,

];

export interface Prompt {
  id: number;
  title: string;
  // title1: string; 
  author: string;
  month: string;
  year: string;
  content: JSX.Element[];
}


export function getRandomPrompt() {
  return allPrompts[Math.floor(Math.random() * allPrompts.length)];
}
export function getEmmanuelPrompt(){
  return allPrompts.find(prompt => prompt.author === "Nwabueze Emmanuel");
}