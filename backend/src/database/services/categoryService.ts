import { Users, Categories } from '../models';

export default class CategoryService {
  /**
   * Obtém todas as categorias.
   * @returns Uma Promise contendo uma lista de categorias, incluindo os usuários associados a cada categoria.
   */
  public getAll = async (): Promise<Categories[]> => {
    const allCategories = await Categories.findAll({
      include: {
        model: Users,
        as: 'users',
        through: {
          attributes: { exclude: ['password'] },
        },
      },
    });
    return allCategories;
  };
}
