interface IFaq {
  _id: string;
  question: string;
  answer: string;
  type: "organizer" | "member";
  isPublish: boolean;
}

export type { IFaq };
