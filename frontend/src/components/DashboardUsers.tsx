import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import IUser from '../interfaces/userInterface';

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
    <div>
      <h3>Informação sobre alunos</h3>
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
                <td>{user.name}</td>
                <td>
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
  );
};

export default DashboardUsers;