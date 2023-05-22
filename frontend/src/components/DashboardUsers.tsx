import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import IUserWithTime from '../interfaces/userWithTimeInterface';
import convertDateFormat from '../utils/dateFormat';
import '../styles/DashboardUsers.css'

const DashboardUsers: React.FC = () => {
  const [users, setUsers] = useState<IUserWithTime[] | null>(null);

  useEffect(() => {
    const userAPI = new UserAPI();

    /**
     * Função assíncrona para buscar os usuários e atualizar o estado 'users'.
     */
    const getUsers = async (): Promise<void> => {
      const allUsers = await userAPI.getAll();
      setUsers(allUsers);
    };

    getUsers();
  }, []);

  return (
    <div className="dashboardUsers">
      <h3>Informação sobre alunos</h3>
      <div className="tableContainer">
        <table className="userTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Atividades</th>
              <th className="updatedAtHead">Último login</th>
              <th className="createdAtHead">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="userName">{user.name}</td>
                  <td className="catName">
                    {user.category &&
                      user.category.map((category, index) => (
                        <p key={index}>{category.name}</p>
                      ))}
                  </td>
                  <td className="updatedAt">
                    {user.updatedAt === user.createdAt ? '-' : convertDateFormat(user.updatedAt)}
                  </td>
                  <td className="createdAt">{convertDateFormat(user.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUsers;