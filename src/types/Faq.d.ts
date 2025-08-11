interface IFaq {
  _id?: string;
  question: string;
  answer: string;
  type: "organizer" | "member";
  isPublish: string;
}

export type { IFaq };
