import { Request, Response } from 'express';
import UserService from '../services/userService';
import IError from '../interface/errorInterface';

export default class UserController {
  userService = new UserService();

  /**
   * Obtém todos os usuários.
   * @param _req O objeto de requisição, dispensável.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com a lista de todos os usuários.
   */
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allUsers = await this.userService.getAll();
      return res.status(200).json(allUsers);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Obtém um usuário com base no ID fornecido.
   * @param req O objeto de requisição contendo o parâmetro ID.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com o usuário encontrado.
   */
  public getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchedUser = await this.userService.getUser(req.params.id);
      return res.status(200).json(searchedUser);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Realiza o login do usuário.
   * @param req O objeto de requisição contendo as informações de login do usuário.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com os detalhes do usuário logado.
   */
  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loggedUser = await this.userService.login(req.body);
      return res.status(200).json(loggedUser);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Cria um novo usuário.
   * @param req O objeto de requisição contendo as informações do novo usuário.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com os detalhes do usuário criado.
   */
  public createNewUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const createdUser = await this.userService.createUser(req.body);
      return res.status(200).json(createdUser);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };
}
