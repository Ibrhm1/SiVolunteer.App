import { DateValue } from "@heroui/react";

interface IOrganizer {
  _id?: string;
  organizerName?: string;
  contactPerson?: string;
  phone?: string;
  descriptionOrganizer?: string;
  email?: string;
  location?: {
    domicile?: string;
    address?: string;
  };
  logo?: string;
  dateEstablished?: string | DateValue;
}

interface IOrganizerUpdate {
  organizerName?: string;
  contactPerson?: string;
  phone?: string;
  descriptionOrganizer?: string;
  logo?: string | FileList;
}

export type { IOrganizerUpdate, IOrganizer };
