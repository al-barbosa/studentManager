import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import '../styles/DashboardClasses.css'
import IUser from '../interfaces/userInterface';

const DashboardUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]|null>(null)

  useEffect(() => {
    const userAPI = new UserAPI();

    const getCat = async () => {
      const allUsers = await userAPI.getAll();
      setUsers(allUsers);
    };

    getCat();
  }, []);

  return (
    <div>
      <h3>Informação sobre alunos</h3>
      <div className="userTable">
        {users && users.map((user) => (
          <div
            key={user.id}
            className="userInfo"
          >
            <h5>{user.name}</h5>
            {user.category && user.category.map((category, index) => (
              <div
              key={index}
              className="userInfo"
              >
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUsers;