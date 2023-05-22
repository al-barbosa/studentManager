import { Users, Categories } from '../models';
import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../utils/errorHandler';
import { IUser, IUserWithoutPass } from '../interface/userInterface';

export default class UserService {
  /**
   * Obtém todos os usuários.
   * @returns Uma Promise contendo uma lista de usuários.
   */
  public getAll = async (): Promise<Users[]> => {
    const allUsers = await Users.findAll({
      include: {
        model: Categories,
        as: 'category',
        through: {
          attributes: [], // Excluir atributos adicionais da tabela associativa
        },
      },
      attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
    });
    return allUsers;
  };

  /**
   * Obtém um usuário com base no ID fornecido.
   * @param id O ID do usuário.
   * @returns Uma Promise contendo o usuário encontrado.
   * @throws Um ErrorHandler com a mensagem 'Usuário não encontrado' se o usuário não for encontrado.
   */
  public getUser = async (id: string): Promise<Users> => {
    await Users.update({ id }, { where: { id } });

    const searchedUser = await Users.findByPk(id, {
      include: {
        model: Categories,
        as: 'category',
        through: {
          attributes: [], // Excluir atributos adicionais da tabela associativa
        },
      },
      attributes: { exclude: ['password'] },
    });

    if (!searchedUser) {
      throw new ErrorHandler('Usuário não encontrado', 404);
    }

    return searchedUser;
  };

  /**
   * Realiza o login do usuário com as informações fornecidas.
   * @param loginInfo As informações de login do usuário (email e senha).
   * @returns Uma Promise contendo os detalhes do usuário logado.
   * @throws Um ErrorHandler com a mensagem 'Usuário não encontrado' se o usuário não for encontrado.
   * @throws Um ErrorHandler com a mensagem 'Email ou senha incorreto' se a senha estiver incorreta.
   */
  public login = async (loginInfo: { email: string, password: string }): Promise<IUser> => {
    const { email, password } = loginInfo;

    const userInfo: Users = await Users.findOne({
      where: { email },
      raw: true,
    }) as Users;

    if (!userInfo) {
      throw new ErrorHandler('Usuário não encontrado', 404);
    }

    const { password: hashedPassword } = userInfo;
    const checkHash = bcrypt.compareSync(password, hashedPassword);

    if (!checkHash) {
      throw new ErrorHandler('Email ou senha incorreto', 404);
    }

    const { id, name } = userInfo;
    const answer = { email, id, name };

    return answer;
  };

  /**
   * Cria um novo usuário com as informações fornecidas.
   * @param userInfo As informações do novo usuário.
   * @returns Uma Promise contendo os detalhes do usuário criado.
   * @throws Um ErrorHandler com a mensagem 'Email já registado' se o email já estiver registrado.
   */
  public createUser = async (userInfo: IUserWithoutPass): Promise<IUser> => {
    const { email, password, name } = userInfo;

    const checkEmail: Users = await Users.findOne({ where: { email } }) as Users;

    if (checkEmail) {
      throw new ErrorHandler('Email já registado', 404);
    }

    const hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT);

    const nUser = await Users.create({
      email,
      name,
      total_time: "0",
      password: hashedPassword,
    });

    const { id } = nUser;
    const createdUser = { email, name, id };

    return createdUser;

  };
}