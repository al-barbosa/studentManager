import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../utils/userAPI';
import AddCategories from '../components/AddCategories';
import Header from '../components/Header';
import '../styles/UserPage.css';
import IRequest from '../interfaces/requestInterface';
import RequestAPI from '../utils/reqAPI';
import convertDateFormat from '../utils/dateFormat';
import UserCats from '../components/UserCats';
import IUserWithTime from '../interfaces/userWithTimeInterface';

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUserWithTime | null>();
  const [requests, setRequests] = useState<IRequest[] | null>();
  const [selectedButton, setSelectedButton] = useState<string>('Cadastros');
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageUser.role !== 'student') {
      navigate('/');
    }

    const localStorageId = localStorageUser.id;

    const userAPI = new UserAPI();
    const requestAPI = new RequestAPI();

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
  }, [navigate]);

  const handleButtonClick = (buttonName: string): void => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      {userInfo && <Header name={userInfo.name} />}
      <div className="userBody">
        <div className="buttonUserContainer">
          <button
            className={selectedButton === 'Cadastros' ? 'selected1 userBtn' : 'unselected1 userBtn'}
            onClick={() => handleButtonClick('Cadastros')}
          >
            Cadastros
          </button>
          <button
            className={selectedButton === 'Adicionar' ? 'selected2 userBtn' : 'unselected2 userBtn'}
            onClick={() => handleButtonClick('Adicionar')}
          >
            Adicionar
          </button>
          <button
            className={selectedButton === 'Pendente' ? 'selected3 userBtn' : 'unselected3 userBtn'}
            onClick={() => handleButtonClick('Pendente')}
          >
            Pendente
          </button>
        </div>
        <div className="userMainInfo">
          {selectedButton === 'Adicionar' && (
            userInfo && userInfo.category && (
              <AddCategories categories={userInfo.category} />
            )
          )}
          {selectedButton === 'Cadastros' && userInfo && userInfo.category && (
            <UserCats
              category={userInfo.category}
              userInfo={userInfo}
            />
          )}
          {selectedButton === 'Pendente' && userInfo && (
            <div className="mainCat">
              <div className="catList">
                <h3>Categorias aguardando confirmação:</h3>
                <ul>
                  {requests ? (
                    requests.map((req) => (
                      <li className="listItem" key={req.id}>
                        <div className="reqName">{req.category.name}</div>
                        <div className="reqDate">Criado em: {convertDateFormat(req.createdAt)}</div>
                      </li>
                    ))
                  ) : (
                    <h2>Sem categorias cadastradas</h2>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;

