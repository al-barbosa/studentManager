import ICategory from "./categoryInterface";

export default interface IUser {
  id?: string,
  name: string,
  email: string,
  password: string,
  totalTime?: string,
  category?: ICategory[]
}