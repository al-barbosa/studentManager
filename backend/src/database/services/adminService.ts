import { Admins } from '../models';
import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../utils/errorHandler';
import { IAdmin, IAdminWithoutPass } from '../interface/adminInterface';

export default class AdminsService {
  /**
   * Obtém todos os administradores.
   * @returns Uma Promise contendo uma lista de administradores.
   */
  public getAll = async (): Promise<Admins[]> => {
    const allAdmins = await Admins.findAll({
      attributes: { exclude: ['password'] },
    });
    return allAdmins;
  };

  /**
   * Obtém um administrador com base no ID fornecido.
   * @param id O ID do administrador.
   * @returns Uma Promise contendo o administrador encontrado.
   * @throws Um ErrorHandler com a mensagem 'Administrador não encontrado' se o administrador não for encontrado.
   */
  public getAdmin = async (id: string): Promise<Admins> => {
    const searchedAdmin = await Admins.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!searchedAdmin) {
      throw new ErrorHandler('Administrador não encontrado', 404);
    }

    return searchedAdmin;
  };

  /**
   * Realiza o login do administrador com as informações fornecidas.
   * @param loginInfo As informações de login do administrador (email e senha).
   * @returns Uma Promise contendo os detalhes do administrador logado.
   * @throws Um ErrorHandler com a mensagem 'Administrador não encontrado' se o administrador não for encontrado.
   * @throws Um ErrorHandler com a mensagem 'Email ou senha incorreto' se a senha estiver incorreta.
   */
  public login = async (loginInfo: IAdmin): Promise<IAdminWithoutPass> => {
    const { email, password } = loginInfo;

    const adminInfo = await Admins.findOne({
      where: { email },
      raw: true,
    }) as Admins;

    if (!adminInfo) {
      throw new ErrorHandler('Administrador não encontrado', 404);
    }

    const { password: hashedPassword } = adminInfo;
    const checkHash = bcrypt.compareSync(password, hashedPassword);

    if (!checkHash) {
      throw new ErrorHandler('Email ou senha incorreto', 404);
    }

    const { id, name } = adminInfo;
    const answer = { email, id, name };

    return answer;
  };
}