import { Users, UserRequests, UsersCategories } from '../models';
import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../utils/errorHandler';

export default class RequestService {
  public getAll = async (): Promise<UserRequests[]> => {
    const allRequests = await UserRequests.findAll({
      include: ['user', 'category'],
      order: [['id', 'ASC']],
    });
    return allRequests;
  };

  public createRequest = async (reqBody: {user_id: string, category_id: string}): Promise<UserRequests> => {
    const { user_id, category_id } = reqBody;
    
    const checkRequest = await UserRequests.findOne( { where: { user_id, category_id } }) as any;
    if(checkRequest) throw new ErrorHandler('Request already exist', 404);

    const nRequest = await UserRequests.create({
      user_id,
      category_id,
    });

    return nRequest;
  };

  public deleteRequest = async (id: string): Promise<{}> => {
    await UserRequests.destroy({ where: { id } });
    return {message: `Pedido ${id} deletado com sucesso.`};
  };

  public acceptRequest = async (user_id: string, categories_id: string): Promise<{}> => {
    const nUserCat = await UsersCategories.create({
      user_id,
      categories_id,
    });
    if (nUserCat) {
      await UserRequests.destroy({ where: { user_id, category_id: categories_id } });
      return nUserCat
    }
    return {message: 'Algo deu errado, tente novamente.'}
  }
}
