import { Admins } from '../models';
import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../utils/errorHandler';

export default class AdminsService {

  public getAll = async (): Promise<Admins[]> => {
    const allAdmins = await Admins.findAll({
      attributes: {exclude: ['password']}
    });
    return allAdmins;
  };

  public getAdmin = async (id: string): Promise<Admins> => {
    const searchedUser = await Admins.findByPk(id, {
      attributes: {exclude: ['password']}
    });
    if (!searchedUser) throw new ErrorHandler('User not found', 404);
    return searchedUser;
  };

  public login = async (loginInfo: any): Promise<any> => {
    // const error: ValidationResult = this.userValidaton.validateLogIn(loginInfo)
    // if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    const { email, password } = loginInfo;

    const adminInfo = await Admins.findOne( {
      where: { email },
      raw: true
    }) as any;
    if (!adminInfo) throw new ErrorHandler('User not found', 404);

    

    const { password: hashedPassword } = adminInfo;
    const checkHash = bcrypt.compareSync(password, hashedPassword);
    if (!checkHash) throw new ErrorHandler('Incorrect email or password', 404);

    const { id, username } = adminInfo;
    // const token = this.tokenHandler.createToken(loginInfo);
    const answer = { email, id, username }
    return answer;
  }
}
