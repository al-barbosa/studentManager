import React, { useEffect, useState } from 'react';
import IRequest from '../interfaces/requestInterface';
import ICategory from '../interfaces/categoryInterface';
import UserAPI from '../utils/userAPI';
import RequestAPI from '../utils/reqAPI';
import CategoriesAPI from '../utils/categoriesAPI';
import IUser from '../interfaces/userInterface';
import '../styles/AddCategories.css';

const AddCategories: React.FC<{
  categories: ICategory[] | null;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ categories, setShowAdd }) => {

  const [categoryList, setCategoryList] = useState<ICategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const userAPI = new UserAPI();
    const requestAPI = new RequestAPI();
    const categoriesAPI = new CategoriesAPI();
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    const localStorageId = localStorageUser.id;
    const getRequests = async () => {
      const retrievedRequests: IRequest[] = await requestAPI.getAll();
      const filteredRequests = retrievedRequests
        .filter((request) => request.user_id === localStorageId);
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
      setLoading(false)
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

  const handleClose = () => {
    setShowAdd(false);
  };


  return (
    <div className='addCatContainer'>
      <div className="addOptions">
        {loading ?
          <h1>Carregando...</h1> :
          <div>
            <button className='closeBtn' onClick={handleClose}>X</button>
            {categoryList && categoryList.length > 0 && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (selectedCategory) {
                  handleSubmit(selectedCategory);
                }
              }}>
                <div className="formContainer">
                  <select value={selectedCategory || ''} onChange={handleCategoryChange}>
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
            {(!categoryList || categoryList.length === 0) && (
              <p>Todas as categorias estão selecionadas.</p>
            )}
          </div>}
      </div>
    </div>
  );
};

export default AddCategories;