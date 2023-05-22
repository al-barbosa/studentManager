import React, { useEffect, useState } from 'react';
import IRequest from '../interfaces/requestInterface';
import ICategory from '../interfaces/categoryInterface';
import UserAPI from '../utils/userAPI';
import RequestAPI from '../utils/reqAPI';
import CategoriesAPI from '../utils/categoriesAPI';
import IUser from '../interfaces/userInterface';
import '../styles/AddCategories.css';
import IUserWithTime from '../interfaces/userWithTimeInterface';

const AddCategories: React.FC<{
  categories: ICategory[] | null;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ categories, setShowAdd }) => {
  const [categoryList, setCategoryList] = useState<ICategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userAPI = new UserAPI();
    const requestAPI = new RequestAPI();
    const categoriesAPI = new CategoriesAPI();
    const localStorageUser: IUserWithTime = JSON.parse(localStorage.getItem('user') || '{}');
    const localStorageId: number = localStorageUser.id;

    /**
     * Obtém as categorias disponíveis para adicionar com base nas solicitações e categorias já existentes do usuário.
     */
    const getCategories = async (): Promise<void> => {
      const retrievedRequests: IRequest[] = await requestAPI.getAll();
      const filteredRequests = retrievedRequests.filter(
        (request) => request.user_id === localStorageId
      );
      const idList: number[] = [];
      filteredRequests?.map((req) => idList.push(req.category_id));

      const userInfo: IUser = await userAPI.getById(`${localStorageId}`);
      const userCategories = userInfo.category;
      userCategories?.map((cat) => idList.push(cat.id));

      const retrievedCategories: ICategory[] = await categoriesAPI.getAll();
      const filteredCategories = retrievedCategories.filter(
        (category) => !idList.includes(category.id)
      );

      setCategoryList(filteredCategories);
      setLoading(false);
    };

    getCategories();
  }, []);

  const requestAPI = new RequestAPI();

  /**
   * Atualiza os estados com base na mudança de valor dos inputs.
   * @param e O evento de alteração.
   */
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(parseInt(e.target.value));
  };

  /**
   * Realiza envio do formulário de adição de categoria.
   * @param categoryId O ID da categoria selecionada.
   */
  const handleSubmit = async (categoryId: number): Promise<void> => {
    const userId: number = JSON.parse(localStorage.getItem('user') || '{}').id;
    await requestAPI.newRequest(`${userId}`, `${categoryId}`);
    setCategoryList((prevCategoryList) => {
      if (prevCategoryList) {
        const filteredList = prevCategoryList.filter(
          (category) => category.id !== categoryId
        );
        return filteredList;
      }
      return null;
    });
    setSelectedCategory(null);
  };

  /**
   * Manipula o fechamento do componente.
   */
  const handleClose = (): void => {
    setShowAdd(false);
  };

  return (
    <div className="addCatContainer">
      <div className="addOptions">
        {loading ? (
          <h1>Carregando...</h1>
        ) : (
          <div>
            <button className="closeBtn" onClick={handleClose}>
              X
            </button>
            {categoryList && categoryList.length > 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (selectedCategory) {
                    handleSubmit(selectedCategory);
                  }
                }}
              >
                <div className="formContainer">
                  <select
                    value={selectedCategory || ''}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoryList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit">Adicionar</button>
                </div>
              </form>
            )}
            {!categoryList || categoryList.length === 0 ? (
              <p>Todas as categorias estão selecionadas.</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategories;