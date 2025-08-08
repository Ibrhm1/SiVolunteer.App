interface IUser {
  _id?: string;
  fullName?: string;
  username?: string;
  email?: string;
  address?: string;
  phone?: string;
  profilePicture?: string;
}

interface IUserUpdate {
  fullName?: string;
  phone?: string;
  address?: string;
  profilePicture?: string | FileList;
}

export type { IUserUpdate, IUser };
