import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';

export default class UserController {
  categoryService = new CategoryService();
  
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allCategories = await this.categoryService.getAll();
      return res
        .status(200)
        .json(allCategories);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }

  };
}
