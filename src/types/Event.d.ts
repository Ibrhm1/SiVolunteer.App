import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  image?: string | FileList;
  category?: string;
  isPublish?: string;
  isOnline?: string;
  location?: {
    region?: string;
    address?: string;
  };
  requiredVolunteers?: number;
  currentVolunteers?: string[];
  requirements?: string;
  benefits?: string;
  tags?: string[];
  createdBy?: string;
  slug?: string;
}

interface IEventForm extends IEvent {
  region?: string;
  address?: string;
}

export type { IEvent, IEventForm };
