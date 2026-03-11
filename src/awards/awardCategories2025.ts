export interface Award {
  id: number;
  category: string;
  nominees: (string | string[])[];
  winner: string | string[];
  description: string;
  year: string;
}

export const awardCategories2025: Award[] = [
  {
    id: 0,
    category: "Rising star of the year ",
    description:
      "This is awarded to the newest members that had the most participation/involvement in activities this year",
    nominees: ["Aangrron", "Laura", "Claudia"],
    winner: "Aangrron",
    year: "2025",
  },
  {
    id: 1,
    category: "Personality of the year ",
    description: "Awarded to the most remarkable personality for the year",
    nominees: ["Nwabueze Emmanuel", "Oputa Sharon", "Bema"],
    winner: "Nwabueze Emmanuel",
    year: "2025",
  },
  {
    id: 2,
    category: "Face of NBL",
    description:
      "This is given to the most influential individual within the community",
    nominees: ["Oputa Sharon", "Ajagbe Ayodeji", "Mororti", "Bema", "Aangrron"],
    winner: "Bema",
    year: "2025",
  },
  {
    id: 3,
    category: "Digital writer of the year ",
    description: "",
    nominees: ["Ajagbe Ayodeji", "Bema", "Aangrron", "Odumosu Morenike"],
    winner: "Aangrron",
    year: "2025",
  },
  {
    id: 4,
    category: "Best mystery",
    description: "",
    nominees: [],
    winner: "",
    year: "2025",
  },
  {
    id: 5,
    category: "Best Naija story",
    description: "",
    nominees: [],
    winner: "",
    year: "2025",
  },
  {
    id: 6,
    category: "Best Thriller",
    description: "",
    nominees: [],
    winner: "",
    year: "2025",
  },
  {
    id: 7,
    category: "Best Romance",
    description: "",
    nominees: [],
    winner: "",
    year: "2025",
  },
  {
    id: 8,
    category: " Best Teen Fiction",
    description: "",
    nominees: [],
    winner: "",
    year: "2025",
  },
  {
    id: 9,
    description: "",
    category: "Best Non Fiction",
    nominees: ["Chikaodili Onyenze", "Gracious", "Bema"],
    winner: "Bema",
    year: "2025",
  },
  {
    id: 10,
    description: "",
    category: "Best General Fiction",
    nominees: [],
    winner: "",
    year: "2025",
  },
  {
    id: 11,
    description: "",
    category: "Best collaboration",
    nominees: [
      ["Ajagbe Ayodeji", "Oputa Sharon", "Bukola Ayeni"],
      ["Ajagbe Ayodeji", "Nwabueze Emmanuel"],
      ["Aangrron", "Nwabueze Emmanuel"],
    ],
    winner: ["Aangrron", "Nwabueze Emmanuel"],
    year: "2025",
  },
  {
    id: 12,
    description: "",
    category: "Book of the year",
    nominees: ["Aangrron", "Ajagbe Ayodeji"],
    winner: "Ajagbe Ayodeji",
    year: "2025",
  },
  {
    id: 13,
    description: "",
    category: "Best prompt of the year",
    nominees: [
      "PJ",
      "Nwabueze Emmanuel",
      "Aangrron",
      "Bema",
      "Chikaodili Onyenze",
    ],
    winner: "PJ",
    year: "2025",
  },
  {
    id: 14,
    description: "",
    category: "Female writer of the year",
    nominees: [
      "PJ",
      "Gracious",
      "Odumosu Morenike",
      "Onwuegbuna Nneka Lisa",
      "Oladimeji Ifeoluwa",
      "Chikaodili Onyenze",
    ],
    winner: "Gracious",
    year: "2025",
  },
  {
    id: 15,
    description:
      "This is awarded to the best male writer in the community based off of their catalogue for this year",

    category: "Male writer of the year",
    nominees: ["Nwabueze Emmanuel", "Ajagbe Ayodeji", "Bema", "Aangrron"],
    winner: "Ajagbe Ayodeji",
    year: "2025",
  },
  {
    id: 16,
    description: "",
    category: "Poet of the year",
    nominees: [
      "Nwabueze Emmanuel",
      "Oladimeji Ifeoluwa",
      "Onwuegbuna Nneka Lisa",
      "Ajagbe Ayodeji",
      "Aangrron",
      "Odumosu Morenike",
    ],
    winner: "Nwabueze Emmanuel",
    year: "2025",
  },
  {
    id: 17,
    description: "",
    category: "Best storyteller",
    nominees: ["Gracious", "PJ", "Odumosu Morenike", "Oputa Sharon"],
    winner: "PJ",
    year: "2025",
  },
  {
    id: 18,
    description: "",
    category: "Best Poetry",
    nominees: [
      "Odumosu Morenike",
      "Ajagbe Ayodeji",
      "Aangrron",
      "Nwabueze Emmanuel",
      "Oladimeji Ifeoluwa",
    ],
    winner: "Ajagbe Ayodeji",
    year: "2025",
  },
];
