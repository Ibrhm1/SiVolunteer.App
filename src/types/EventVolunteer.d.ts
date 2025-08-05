interface IEventVolunteer {
  _id?: string;
  eventId?: string;
  userId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type { IEventVolunteer, IEventVolunteerStatus };
