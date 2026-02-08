export interface Award {

  id: number;
  description : string;
  category: string;
  nominees:(string | string[])[]; 
  winner: string | string[];
  year: string ;
}

export const awardCategories: Award[] = [
  {
    id: 0,
    description: "Awarded to the most remarkable personality for the year",
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
    description: "This is given to the most influential individual within the community",
    category: "Face of NBL",
    nominees: ["Bema", "Andrew Ewerechukwu Promise", "Maryanne", "Samson"],
    winner: "Samson",
    year: "2024"

  },
  {
    id: 2,
    description: "This is awarded to the best male writer in the community based off of their catalogue for this year",
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
    description: "This is given to the poet with the best catalogue for this year",
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
    description: "This is awarded to the newest members that had the most participation/involvement in activities this year",
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
    description: "",
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
    description: "This Award is given to the best written prompt within the particular year",
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
    description: "",
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
  description: "",
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
    description: "This award is given to the most exceptional book written by a member of the community in this year (Must be written within the year to be nominated)",
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
    description: "",
    category: "Best mystery",
    nominees: ["Samson", "Oladimeji Ifeoluwa"],
    winner: "Samson",
    year: "2024"

  },
  {
    id: 11,
    description: "This is awarded to the best Nigerian-centric book by a community member this year",
    category: "Best Naija story",
    nominees: ["Samson", "Odumosu Morenike", "Ezechinyere Idinmachukwu Esther"],
    winner: "Samson",
    year: "2024"

  },
  {
    id: 12,
    description: "This is awarded to the best teen-fiction book written by a community member this year",
    category: "Best teen Fiction",
    nominees: ["Samson", "Bukola Ayeni", "Odumosu Morenike"],
    winner: "Odumosu Morenike",
    year: "2024"

  },
  {
    id: 13,
    description: "This is awarded to the best female writer in the community based off of their catalogue for this year",
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
    description: "This is awarded to the best written poem of the year",
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
    description: "This is awarded to the best book in the general fiction genre written by acommunity member this year",
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
    description: "",
    category: "Best Thriller",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2024"

  },
];
