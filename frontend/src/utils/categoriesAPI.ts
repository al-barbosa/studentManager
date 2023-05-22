import ICategory from "../interfaces/categoryInterface";

class CategoriesAPI {
  /**
   * Busca todas as categorias registradas.
   * @returns Promise com um array contendo todas as categorias.
   */
  public getAll = async (): Promise<ICategory[]> => {
    const URL = '/categories';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
}

export default CategoriesAPI;