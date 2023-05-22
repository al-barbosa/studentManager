import IUser from "./userInterface";

export default interface ICategory {
  id: number;
  name: string;
  users: IUser[];
}