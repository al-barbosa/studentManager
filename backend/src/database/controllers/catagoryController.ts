import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';
import IError from '../interface/errorInterface';

export default class UserController {
  categoryService = new CategoryService();

  /**
   * Obtém todas as categorias.
   * @param _req O objeto de requisição, dispensável.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com a lista de todas as categorias.
   */
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allCategories = await this.categoryService.getAll();
      return res.status(200).json(allCategories);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };
}