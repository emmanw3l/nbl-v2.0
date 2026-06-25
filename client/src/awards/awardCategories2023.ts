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
    id: 11,
    description: "",
    category: "Best controversial genre",
    nominees: ["Oladimeji Ifeoluwa", "Oputa Sharon", "Samson"],
    winner: "Samson",
    year: "2023",
  },
  {
    id: 12,
    description:
      "Awarded to the best written book in the genereal fiction genre by a community member this year ",
    category: "Best General fiction",
    nominees: ["Samson"],
    winner: "Samson",
    year: "2023",
  },
];
