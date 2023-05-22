import ICategory from "./categoryInterface";

export default interface IUserWithTime {
  id: number;
  name: string;
  email: string;
  password?: string;
  total_time: number;
  createdAt: string;
  updatedAt: string;
  category?: ICategory[]
}