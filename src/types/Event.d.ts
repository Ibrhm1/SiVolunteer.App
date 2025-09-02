import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  image?: string | FileList;
  category?: {
    _id?: string;
    name?: string;
  };
  isPublish?: string;
  isOnline?: string;
  location?: {
    region?: string;
    address?: string;
  };
  requiredVolunteers?: number;
  currentVolunteers?: {
    _id?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
  }[];
  requirements?: string;
  benefits?: string;
  tags?: string[];
  createdBy?: {
    _id?: string;
    organizerName?: string;
    email?: string;
  };
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IEventForm extends IEvent {
  region?: string;
  address?: string;
}

export type { IEvent, IEventForm };
