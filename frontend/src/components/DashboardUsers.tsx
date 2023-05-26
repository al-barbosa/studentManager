import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import IUserWithTime from '../interfaces/userWithTimeInterface';
import convertDateFormat from '../utils/dateFormat';
import imageMapping from '../utils/imageMapping';
import checkMediaSize from '../utils/checkMediaSize';
import '../styles/DashboardUsers.css';

const DashboardUsers: React.FC = () => {
  const [users, setUsers] = useState<IUserWithTime[] | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    const userAPI = new UserAPI();

    const getUsers = async (): Promise<void> => {
      const allUsers = await userAPI.getAll();
      setUsers(allUsers);
    };

    getUsers();
  }, []);

  const handleUserNameClick = (userId: number): void => {
    if (selectedRow === userId) {
      setSelectedRow(null);
    } else {
      setSelectedRow(userId);
    }
  };

  return (
    <div className="dashboardUsers">
      <h3>Informação sobre alunos</h3>
      <div className="tableContainer">
        <div className="usersTable">
          {users &&
            users.map((user) => (
              <div key={user.id}>
                <div
                  className={`userName ${selectedRow === user.id ? 'selected' : ''}`}
                  onClick={() => handleUserNameClick(user.id)}
                >
                  {user.name}
                </div>
                <div className={`${selectedRow === user.id ? 'selectedUser' : 'unselectedUser'}`}>
                  <div className="userInfoCont">
                    <div className="catName">
                      {user.category &&
                        user.category.map((category, index) => (
                          <div className="singleCat">
                            <img src={imageMapping[category.id]} alt="Imagem da categoria" width={checkMediaSize()} height={checkMediaSize()}></img>
                            <p key={index}>{category.name}</p>
                          </div>
                        ))}
                    </div>
                    <div className="userDates">
                      <div className="updatedAt">
                        <p>Último login</p>
                        {user.updatedAt === user.createdAt ? '-' : convertDateFormat(user.updatedAt)}
                      </div>
                      <div className="createdAt">
                        <p>Criado em</p>
                        <div>{convertDateFormat(user.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;