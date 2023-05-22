export interface IAdminWithoutPass {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface IAdmin {
  id?: number;
  name: string;
  email: string;
  password: string;
}