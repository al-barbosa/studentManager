import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {

  userService = new UserService();
  
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allUsers = await this.userService.getAll();
      return res
        .status(200)
        .json(allUsers);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }

  };

  public getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchedUser = await this.userService.getUser(req.params.id);
      return res.status(200).json(searchedUser);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loggedUser = await this.userService.login(req.body);
      return res
        .status(200)
        .json(loggedUser);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };
}
