export interface Award {

  id: number;
  category: string;
  nominees:(string | string[])[]; 
  winner: string | string[];
}

export const awardCategories: Award[] = [
  {
    id: 0,
    category: "Personality of the year",
    nominees: [
      "Bema",
      "Nwabueze Emmanuel",
      "samson",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "Bema",
  },
  {
    id: 1,
    category: "Face of NBL",
    nominees: ["Bema", "Andrew Ewerechukwu Promise", "Maryanne", "Samson"],
    winner: "Samson",
  },
  {
    id: 2,
    category: "Best Male Writer",
    nominees: [
      "Samson",
      "Nwabueze Emmanuel",
      "Bema",
      "Andrew Ewerechukwu Promise",
    ],
    winner: "Samson",
  },
  {
    id: 3,
    category: "Poet of the year",
    nominees: [
      "Onwuegbuna Nneka Lisa",
      "Andrew Ewerechukwu Promise",
      "Nwabueze Emmanuel",
      "Oputa Sharon",
    ],
    winner: "Andrew Ewerechukwu Promise",
  },
  {
    id: 4,
    category: "Rising Star",
    nominees: [
      "Andrew Ewerechukwu Promise",
      "Ezechinyere Idinmachukwu Esther",
      "Gracious",
      "Raheemah",
    ],
    winner: "Gracious",
  },
  {
    id: 5,
    category: "Best storyteller",
    nominees: [
      "Samson",
      "Odumosu Morenike",
      "Nwabueze Emmanuel",
      "Bukola Ayeni",
      "Oputa Sharon",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "Oputa Sharon",
  },
  {
    id: 6,
    category: "Best NBL prompt",
    nominees: [
      "Samson",
      "Ezechinyere Idinmachukwu Esther",
      "Bema",
      "Oputa Sharon",
      "Andrew Ewerechukwu Promise",
      "Oladimeji Ifeoluwa",
    ],
    winner: "Newcomer 1",
  },
  {
    id: 7,
    category: "Digital writer",
    nominees: [
      "Samson",
      "Bukola Ayeni",
      "Odumosu Morenike",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "Samson",
  },
 {
  id: 8,
  category: "Best collaboration",
  nominees: [
    ["Nwabueze Emmanuel", "Ezechinyere Idinmachukwu Esther"],
    ["Chikaodili Oyenze", "Makitoru"],
    ["Samson", "Divine"],
    ["Gracious", "Oladimeji Ifeoluwa"],
  ],

    winner: ["Samson", "Divine"],
  },
  {
    id: 9,
    category: "Book of the year",
    nominees: [
      "Samson",
      "Bukola Ayeni",
      "Odumosu Morenike",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "samson",
  },
  {
    id: 10,
    category: "Best mystery",
    nominees: ["Samson", "Oladimeji Ifeoluwa"],
    winner: "Samson",
  },
  {
    id: 11,
    category: "Best Naija story",
    nominees: ["Samson", "Odumosu Morenike", "Ezechinyere Idinmachukwu Esther"],
    winner: "",
  },
  {
    id: 12,
    category: "Best teen Fiction",
    nominees: ["Samson", "Bukola Ayeni", "Odumosu Morenike"],
    winner: "",
  },
  {
    id: 13,
    category: "Best female writer",
    nominees: [
      "Odumosu Morenike",
      "Onwuegbuna Nneka Lisa",
      "Oladimeji Ifeoluwa",
      "Ezechinyere Idinmachukwu Esther",
      "Bukola Ayeni",
      "Oputa Sharon",
    ],
    winner: "Odumosu Morenike",
  },
  {
    id: 14,
    category: "Poetry of the year",
    nominees: [
      "Nwabueze Emmanuel",
      "Oputa Sharon",
      "Andrew Ewerechukwu Promise",
      "Onwuegbuna Nneka Lisa",
    ],
    winner: "",
  },
  {
    id: 15,
    category: "Best general fiction",
    nominees: [
      "Odumosu Morenike",
      "Bukola Ayeni",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "",
  },
  {
    id: 16,
    category: "Best Thriller",
    nominees: [],
    winner: "",
  },
];
