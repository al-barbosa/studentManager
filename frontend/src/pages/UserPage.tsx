import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../utils/userAPI';
import IUser from '../interfaces/userInterface';
import AddCategories from '../components/AddCategories';
import Header from '../components/Header';
import '../styles/UserPage.css';
import IRequest from '../interfaces/requestInterface';
import RequestAPI from '../utils/reqAPI';

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>();
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [requests, setRequests] = useState<IRequest[] | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageUser.role !== 'student') {
      navigate('/');
    }

    const localStorageId = localStorageUser.id;

    const userAPI = new UserAPI();
    const requestAPI = new RequestAPI();

    /**
     * Obtém as informações do usuário.
     * @param id O ID do usuário.
     */
    const getInfo = async (id: string): Promise<void> => {
      const userInfo = await userAPI.getById(id);
      if (!userInfo.id) {
        navigate('/');
      }
      setUserInfo(userInfo);
      const retrievedRequests: IRequest[] = await requestAPI.getAll();
      const filteredRequests = retrievedRequests.filter(
        (request) => request.user_id === localStorageId
      );
      setRequests(filteredRequests);
    };

    getInfo(localStorageId);
  }, [navigate, showAdd]);

  /**
   * Manipula estado para mostrar janela de adicionar categoria.
   */
  const handleAddCategory = (): void => {
    setShowAdd(true);
  };

  return (
    <div>
      {userInfo && <Header name={userInfo.name} />}
      <div className="userBody">
        <button className="addBtn" onClick={handleAddCategory}>
          Adicionar Categoria
        </button>
        {showAdd && userInfo && userInfo.category && (
          <AddCategories categories={userInfo.category} setShowAdd={setShowAdd} />
        )}
        {userInfo && (
          <div className="catList">
            <h3>Categorias cadastradas:</h3>
            <ul>
              {userInfo.category ? (
                userInfo.category.map((cat) => (
                  <li className="listItem" key={cat.id}>
                    {cat.name}
                  </li>
                ))
              ) : (
                <h2>Sem categorias cadastradas</h2>
              )}
            </ul>
          </div>
        )}
        {userInfo && (
          <div className="catList">
            <h3>Categorias aguardando confirmação:</h3>
            <ul>
              {requests ? (
                requests.map((req) => (
                  <li className="listItem" key={req.id}>
                    {req.category.name}
                  </li>
                ))
              ) : (
                <h2>Sem categorias cadastradas</h2>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;