import ICategory from "./categoryInterface";

export default interface IUser {
  id?: number;
  name: string;
  email: string;
  message?: string;
  password?: string;
  total_time?: number;
  category?: ICategory[]
}