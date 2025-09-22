export interface Award {
  id: number;
  category: string;
  nominees: (string | string[])[];
  winner: string | string[];
  year: string;
}

export const awardCategories2023: Award[] = [
  {
    id: 0,
    category: "Prompt of the year",
    nominees: ["Oladimeji Ifeoluwa"],
    winner: "Oladimeji Ifeoluwa",
    year: "2023",
  },
  {
    id: 1,
    category: "Poet of the year",
    nominees: ["Maryanne", "Samson", "Onwuegbuna Nneka Lisa"],
    winner: "Maryanne",
    year: "2023",
  },
  {
    id: 2,
    category: "Face of NBL",
    nominees: [
      "Samson",
      "Bema",
      "Oputa Sharon",
      "Odumosu Morenike",
      "Oladimeji Ifeoluwa",
    ],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 3,
    category: "Digital book of the year",
    nominees: ["Samson", "Bema", "Moroti", "Odumosu Morenike"],
    winner: "Moroti",
    year: "2023",
  },
  {
    id: 4,
    category: "Best teen fiction",
    nominees: ["Odumosu Morenike", "PJ" ,"Oladimeji Ifeoluwa","Moroti", "Oputa Sharon" ],
    winner: "Oputa Sharon",
    year: "2023",
  },
  {
    id: 5,
    category: "Personality of the year",
    nominees: ["Samson", "Moroti", "Nwabueze Emmanuel", "Bema", "Maryanne", "Divine", "Oladimeji Ifeoluwa", "Odumosu Morenike"],
    winner: "Bema",
    year: "2023",
  },
  {
    id: 6,
    category: "Book of the year",
    nominees: ["Samson", "Bema", "Moroti"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 7,
    category: "Best Romance",
    nominees: ["Divine", "Bema"],
    winner: "Bema",
    year: "2023",
  },
  {
    id: 8,
    category: "Best African-centric book",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 9,
    category: "Best Female writer",
    nominees: ["Odumosu Morenike", "Oputa Sharon", "Moroti", "Divine", "Oladimeji Ifeoluwa"],
    winner: "Oputa Sharon",
    year: "2023",
  },
  {
    id: 10,
    category: "Best Male writer",
    nominees: ["Samson", "Bema", "Nwabueze Emmanuel"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 11,
    category: "Best controversial genre",
    nominees: ["Oladimeji Ifeoluwa", "Oputa Sharon", "Samson"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 12,
    category: "Best General fiction",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2023",
  },
];
