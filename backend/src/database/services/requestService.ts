import { UserRequests, UsersCategories } from '../models';
import ErrorHandler from '../utils/errorHandler';

export default class RequestService {
  /**
   * Obtém todas as solicitações.
   * @returns Uma Promise contendo uma lista de todas as solicitações.
   */
  public getAll = async (): Promise<UserRequests[]> => {
    const allRequests = await UserRequests.findAll({
      include: ['user', 'category'],
      order: [['id', 'ASC']],
    });
    return allRequests;
  };

  /**
   * Cria uma nova solicitação com base nas informações fornecidas.
   * @param reqBody As informações da nova solicitação (user_id e category_id).
   * @returns Uma Promise contendo a solicitação criada.
   * @throws Um ErrorHandler com a mensagem 'Requisição já realizada' se a solicitação já existir.
   */
  public createRequest = async (reqBody: { user_id: string, category_id: string }): Promise<UserRequests> => {
    const { user_id, category_id } = reqBody;

    const checkRequest = await UserRequests.findOne({ where: { user_id, category_id } }) as UserRequests;
    if (checkRequest) {
      throw new ErrorHandler('Requisição já realizada', 404);
    }

    const nRequest = await UserRequests.create({
      user_id,
      category_id,
    });

    return nRequest;
  };

  /**
   * Deleta uma solicitação com base no ID fornecido.
   * @param id O ID da solicitação a ser deletada.
   * @returns Um objeto vazio indicando que a solicitação foi deletada com sucesso.
   */
  public deleteRequest = async (id: string): Promise<{}> => {
    await UserRequests.destroy({ where: { id } });
    return { message: `Pedido ${id} deletado com sucesso.` };
  };

  /**
   * Aceita uma solicitação de usuário e cria uma nova relação entre usuário e categoria.
   * @param user_id O ID do usuário.
   * @param category_id O ID da categoria.
   * @returns Um objeto vazio indicando que a solicitação foi aceita.
   * @throws Um ErrorHandler com a mensagem 'Algo deu errado, tente novamente.' se algo der errado durante o processo.
   */
  public acceptRequest = async (user_id: string, category_id: string): Promise<{}> => {
    console.log(user_id, category_id)
    
    const nUserCat = await UsersCategories.create({
      user_id,
      categories_id: category_id,
    });

    console.log(nUserCat)
    if (nUserCat) {
      await UserRequests.destroy({ where: { user_id, category_id } });
      return nUserCat;
    }

    return { message: 'Algo deu errado, tente novamente.' };
  };
}
