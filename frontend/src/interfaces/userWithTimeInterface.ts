import ICategory from "./categoryInterface";

export default interface IUserWithTime {
  id?: string,
  name: string,
  email: string,
  password?: string,
  total_time: number,
  category?: ICategory[]
}