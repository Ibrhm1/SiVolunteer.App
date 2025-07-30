import { DateValue } from "@heroui/react";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegisterUser {
  fullName: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface IRegisterOrganizer {
  organizerName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactPerson: string;
  descriptionOrganizer: string;
  dateEstablished: string | DateValue;
  phone: string;
  domicile: string;
  address: string;
}

interface IActivation {
  code: string;
}

interface ILogin {
  identifier: string; // email or username
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegisterUser,
  IRegisterOrganizer,
  IActivation,
  ILogin,
  UserExtended,
  SessionExtended,
  JWTExtended,
};
