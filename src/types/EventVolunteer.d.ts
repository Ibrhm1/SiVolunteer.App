interface IEventVolunteer {
  _id?: string;
  eventId?: string;
  userId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IEventVolunteerRegister {
  eventId?: string;
  motivation?: string;
  phone?: string;
  email?: string;
}

export type { IEventVolunteer, IEventVolunteerRegister };
