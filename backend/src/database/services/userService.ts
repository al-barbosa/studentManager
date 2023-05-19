import { Users, Categories } from '../models';
import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../utils/errorHandler';

export default class UserService {
  public getAll = async (): Promise<Users[]> => {
    const allUsers = await Users.findAll({
      include: {
        model: Categories,
        as: 'category',
        through: {
          attributes: [], // Excluir atributos adicionais da tabela associativa
        },
      },
      attributes: {exclude: ['password']}
    });
    return allUsers;
  };

  public getUser = async (id: string): Promise<Users> => {
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
    if (!searchedUser) throw new ErrorHandler('User not found', 404);
    return searchedUser;
  };

  public login = async (loginInfo: any): Promise<any> => {
    // const error: ValidationResult = this.userValidaton.validateLogIn(loginInfo)
    // if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    const { email, password } = loginInfo;

    const userInfo = await Users.findOne( {
      where: { email },
      raw: true
    }) as any;
    if (!userInfo) throw new ErrorHandler('User not found', 404);

    

    const { password: hashedPassword } = userInfo;
    const checkHash = bcrypt.compareSync(password, hashedPassword);
    if (!checkHash) throw new ErrorHandler('Incorrect email or password', 404);

    const { id, username } = userInfo;
    // const token = this.tokenHandler.createToken(loginInfo);
    const answer = { email, id, username }
    return answer;
  }

  public createUser = async (userInfo: any): Promise<any> => {
    // const error: ValidationResult = this.userValidaton.validateLogIn(loginInfo)
    // if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);
    // const error: ValidationResult = this.userValidaton.validateSignUp(userInfo)
    // if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    
    const { email, password, name} = userInfo;
    
    const checkEmail = await Users.findOne( { where: { email } }) as any;
    if(checkEmail) throw new ErrorHandler('Email already registered', 404);
    
    const hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT);

    const nUser = await Users.create({
      email,
      name,
      total_time: "0",
      password: hashedPassword,
    });

    const { id } = nUser;

    const createdUser = { email, name, id }

    return createdUser;
  }
}
