import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../utils/userAPI';
import IUser from '../interfaces/userInterface';
import AddCategories from '../components/AddCategorie';
import Header from '../components/Header';

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUser|null>();
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageUser.role !== 'student') {
      navigate('/');
    }

    const localStorageId = localStorageUser.id;

    const userAPI = new UserAPI();

    const getInfo = async (id: string) => {
      const userInfo = await userAPI.getById(id);
      if (!userInfo.id) {
        navigate('/');
      }
      setUserInfo(userInfo);
    };

    getInfo(localStorageId);
  }, [navigate]);

  const handleAddCategory = () => {
    setShowAdd(true)
  };

  return (
    <div>
      {userInfo && <Header name={userInfo.name}/>}
      {userInfo && 
      <div>
        <h3>Categorias:</h3>
        <ul>
          {userInfo.category ?
          userInfo.category.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          )) :
          <h2>Sem categorias cadastradas</h2>}
        </ul>
      </div>}
      <button onClick={handleAddCategory}>Adicionar Categoria</button>
      {(showAdd && userInfo && userInfo.category) &&
      <AddCategories categories={userInfo.category}/>}
    </div>
  );
};

export default UserPage;