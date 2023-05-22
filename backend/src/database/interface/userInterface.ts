import ICategory from "./categoryInterface";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  total_time?: number;
  category?: ICategory[]
}

export interface IUserWithoutPass {
  id?: number;
  name: string;
  email: string;
  password: string;
  total_time?: number;
  category?: ICategory[]
}