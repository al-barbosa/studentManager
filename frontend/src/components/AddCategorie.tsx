import React, { useEffect, useState } from 'react';
import IRequest from '../interfaces/requestInterface';
import ICategory from '../interfaces/categoryInterface';
import UserAPI from '../utils/userAPI';
import RequestAPI from '../utils/reqAPI';
import CategoriesAPI from '../utils/categoriesAPI';
import IUser from '../interfaces/userInterface';

const AddCategories: React.FC<{
  categories: ICategory[] | null;
}> = ({ categories }) => {

  const [requests, setRequests] = useState<IRequest[] | null>(null);
  const [categoryList, setCategoryList] = useState<ICategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const userAPI = new UserAPI();
    const requestAPI = new RequestAPI();
    const categoriesAPI = new CategoriesAPI();
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    const localStorageId = localStorageUser.id;
    const getRequests = async () => {
      const retrievedRequests: IRequest[] = await requestAPI.getAll();
      const filteredRequests = retrievedRequests.filter((request) => request.user_id === localStorageId);
      setRequests(filteredRequests);
      const idList: number[] = []
      filteredRequests?.map((req) => idList.push(req.category_id))
      const userInfo: IUser = await userAPI.getById(JSON.parse(localStorage.getItem('user') || '{}').id);
      const categories = userInfo.category;
      categories?.map((cat) => idList.push(cat.id));
      const retrievedCategories: ICategory[] = await categoriesAPI.getAll();
      const filteredCategories = retrievedCategories.filter(
        (category) => !idList.includes(category.id)
      );
      setCategoryList(filteredCategories);
    };
    getRequests();
  }, []);

  const requestAPI = new RequestAPI();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(event.target.value));
  };

  const handleSubmit = async (categoryId: number) => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    await requestAPI.newRequest(userId, `${categoryId}`);
    setCategoryList((prevCategoryList) => {
      if (prevCategoryList) {
        const filteredList = prevCategoryList.filter((category) => category.id !== categoryId);
        return filteredList;
      }
      return null;
    });
    setSelectedCategory(null);
  };

  return (
    <div>
      {categoryList && categoryList.length > 0 && (
        <form onSubmit={(e) => {
          e.preventDefault();
          if (selectedCategory) {
            handleSubmit(selectedCategory);
          }
        }}>
          <h3>Adicionar Categoria</h3>
          <select value={selectedCategory || ''} onChange={handleCategoryChange}>
            <option value="">Selecione uma categoria</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit">Adicionar</button>
        </form>
      )}

      {(!categoryList || categoryList.length === 0) && (
        <p>Todas as categorias estão selecionadas.</p>
      )}
    </div>
  );
};

export default AddCategories;