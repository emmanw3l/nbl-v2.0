export interface Award {

  id: number;
  category: string;
  nominees:(string | string[])[]; 
  winner: string | string[];
  year: string ;
}

export const awardCategories: Award[] = [
  {
    id: 0,
    category: "Personality of the year",
    nominees: [
      "Bema",
      "Nwabueze Emmanuel",
      "Samson",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "Bema",
    year: "2024"
  },
  {
    id: 1,
    category: "Face of NBL",
    nominees: ["Bema", "Andrew Ewerechukwu Promise", "Maryanne", "Samson"],
    winner: "Samson",
    year: "2024"

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
    year: "2024"

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
    year: "2024"

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
    year: "2024"

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
    year: "2024"

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
    winner: "Samson",
    year: "2024"

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
    year: "2024"

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
    year: "2024"

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
    winner: "Samson",
    year: "2024"

  },
  {
    id: 10,
    category: "Best mystery",
    nominees: ["Samson", "Oladimeji Ifeoluwa"],
    winner: "Samson",
    year: "2024"

  },
  {
    id: 11,
    category: "Best Naija story",
    nominees: ["Samson", "Odumosu Morenike", "Ezechinyere Idinmachukwu Esther"],
    winner: "Samson",
    year: "2024"

  },
  {
    id: 12,
    category: "Best teen Fiction",
    nominees: ["Samson", "Bukola Ayeni", "Odumosu Morenike"],
    winner: "Odumosu Morenike",
    year: "2024"

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
    year: "2024"

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
    winner: "Onwuegbuna Nneka Lisa",
    year: "2024"

  },
  {
    id: 15,
    category: "Best general fiction",
    nominees: [
      "Odumosu Morenike",
      "Bukola Ayeni",
      "Ezechinyere Idinmachukwu Esther",
    ],
    winner: "Odumosu Morenike",
    year: "2024"

  },
  {
    id: 16,
    category: "Best Thriller",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2024"

  },
];
