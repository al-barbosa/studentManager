import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import IUser from '../interfaces/userInterface';
import '../styles/DashboardUsers.css'

const DashboardUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    const userAPI = new UserAPI();

    const getUsers = async () => {
      const allUsers = await userAPI.getAll();
      setUsers(allUsers);
    };

    getUsers();
  }, []);

  return (
    <div className='dashboardUsers'>
      <h3>Informação sobre alunos</h3>
      <div className="tableContainer">
        <table className="userTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Atividades</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className='userName'>{user.name}</td>
                  <td className='catName'>
                    {user.category &&
                      user.category.map((category, index) => (
                        <p key={index}>{category.name}</p>
                      ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUsers;