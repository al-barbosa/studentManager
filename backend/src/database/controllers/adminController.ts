import { Request, Response } from 'express';
import AdminService from '../services/adminService';

export default class AdminController {

  adminService = new AdminService();
  
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allAdmins = await this.adminService.getAll();
      return res
        .status(200)
        .json(allAdmins);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }

  };

  public getAdminById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchedAdmin = await this.adminService.getAdmin(req.params.id);
      return res.status(200).json(searchedAdmin);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loggedAdmin = await this.adminService.login(req.body);
      return res
        .status(200)
        .json(loggedAdmin);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };
}
