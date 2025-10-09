export interface Award {
  id: number;
  category: string;
  nominees: (string | string[])[];
  winner: string | string[];
  description: string;
  year: string;
}

export const awardCategories2023: Award[] = [
  {
    id: 0,
    description: "This award is given to the best written prompt within the particular year",
    category: "Prompt of the year",
    nominees: ["Oladimeji Ifeoluwa"],
    winner: "Oladimeji Ifeoluwa",
    year: "2023",
  },
  {
    id: 1,
    description: "This is given to the poet with the best catalogue in 2023 ",
    category: "Poet of the year",
    nominees: ["Maryanne", "Samson", "Onwuegbuna Nneka Lisa"],
    winner: "Maryanne",
    year: "2023",
  },
  {
    id: 2,
    description: "This is given to the most influential individual within the community",
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
    description: "This award is given to the most exceptional book written by a member of the community in this year (Must be written within the year to be nominated)",
    category: "Digital book of the year",
    nominees: ["Samson", "Bema", "Moroti", "Odumosu Morenike"],
    winner: "Moroti",
    year: "2023",
  },
  {
    id: 4,
    description: "Given to the best teen-fiction book written by a community member this year",
    category: "Best teen fiction",
    nominees: ["Odumosu Morenike", "PJ" ,"Oladimeji Ifeoluwa","Moroti", "Oputa Sharon" ],
    winner: "Oputa Sharon",
    year: "2023",
  },
  {
    id: 5,
    description: "Awarded to the most remarkable personality for the year",
    category: "Personality of the year",
    nominees: ["Samson", "Moroti", "Nwabueze Emmanuel", "Bema", "Maryanne", "Divine", "Oladimeji Ifeoluwa", "Odumosu Morenike"],
    winner: "Bema",
    year: "2023",
  },
  {
    id: 6,
    description: "This is awarded to the best written book by a community member across all genres this year",
    category: "Book of the year",
    nominees: ["Samson", "Bema", "Moroti"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 7,
    description: "This is awarded to the best book of the romance genre by a community member written this year",
    category: "Best Romance",
    nominees: ["Divine", "Bema"],
    winner: "Bema",
    year: "2023",
  },
  {
    id: 8,
    description: "This is awarded to the best written book based off of an african setting written by a community member this year",
    category: "Best African-centric book",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 9,
    description: "This is awarded to the best female writer in the community based off of their catalogue for this year",
    category: "Best Female writer",
    nominees: ["Odumosu Morenike", "Oputa Sharon", "Moroti", "Divine", "Oladimeji Ifeoluwa"],
    winner: "Oputa Sharon",
    year: "2023",
  },
  {
    id: 10,
    description: "This is awarded to the best male writer in the community based off of their catalogue for this year",
    category: "Best Male writer",
    nominees: ["Samson", "Bema", "Nwabueze Emmanuel"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 11,
    description: "",
    category: "Best controversial genre",
    nominees: ["Oladimeji Ifeoluwa", "Oputa Sharon", "Samson"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 12,
    description: "Awarded to the best written book in the genereal fiction genre by a community member this year ",
    category: "Best General fiction",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2023",
  },
];
