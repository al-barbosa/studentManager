import React, { useEffect, useState } from 'react';
import RequestAPI from '../utils/reqAPI';
import IRequest from '../interfaces/requestInterface';
import ICategory from '../interfaces/categoryInterface';

interface AddCategoriesProps {
  categories: ICategory[] | null;
}

const AddCategories: React.FC<AddCategoriesProps> = ({ categories }) => {
  const [requests, setRequests] = useState<IRequest[] | null>(null);
  const [categoryList, setCategoryList] = useState<ICategory[] | null>(null);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    const localStorageId = localStorageUser.id;

    const requestAPI = new RequestAPI();

    const getRequests = async () => {
      const retrievedRequests: IRequest[] = await requestAPI.getAll();
      const filteredRequests = retrievedRequests.filter((request) => request.user_id === localStorageId);
      setRequests(filteredRequests);
    };

    getRequests();
  }, []);

  return (
    <div>
      <h3>Requisições em aberto</h3>
      {requests ? (
        requests.map((request) => (
          <div key={request.id}>
            <p>ID: {request.id}</p>
            <p>Categoria: {request.category.name}</p>
          </div>
        ))
      ) : (
        <h4>Sem requisições abertas</h4>
      )}
    </div>
  );
};

export default AddCategories;
