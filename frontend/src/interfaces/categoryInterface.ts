import IUser from "./userInterface";

export default interface ICategory {
  id?: string,
  name: string,
  users: IUser[]
}