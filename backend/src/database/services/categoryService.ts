import { Users, Categories } from '../models';

export default class CategoryService {
  public getAll = async (): Promise<Categories[]> => {
    const allCategories = await Categories.findAll({
      include: {
        model: Users,
        as: 'users',
        through: {
          attributes: { exclude: ['password'] }, // Excluir atributos adicionais da tabela associativa
        },
      }
    });
    return allCategories;
  };
}
