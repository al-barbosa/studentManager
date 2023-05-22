import { Request, Response } from 'express';
import AdminService from '../services/adminService';
import IError from '../interface/errorInterface';

export default class AdminController {
  adminService = new AdminService();

  /**
   * Obtém todos os administradores.
   * @param _req O objeto de requisição, dispensável.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com a lista de todos os administradores.
   */
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allAdmins = await this.adminService.getAll();
      return res.status(200).json(allAdmins);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Obtém um administrador com base no ID fornecido.
   * @param req O objeto de requisição contendo o parâmetro ID.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com o administrador encontrado.
   */
  public getAdminById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchedAdmin = await this.adminService.getAdmin(req.params.id);
      return res.status(200).json(searchedAdmin);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Realiza o login do administrador.
   * @param req O objeto de requisição contendo as informações de login do administrador.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com os detalhes do administrador logado.
   */
  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loggedAdmin = await this.adminService.login(req.body);
      return res.status(200).json(loggedAdmin);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };
}
