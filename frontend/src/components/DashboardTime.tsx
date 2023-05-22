import React, { useEffect, useState } from 'react';
import IUserWithTime from '../interfaces/userWithTimeInterface';
import UserAPI from '../utils/userAPI';
import getFirstName from '../utils/getFirstName';
import '../styles/DashboardTime.css';

const DashboardTime: React.FC = () => {
  const [users, setUsers] = useState<IUserWithTime[] | null>(null);

  useEffect(() => {
    const userAPI = new UserAPI();

    const getUsers = async (): Promise<void> => {
      const users = await userAPI.getAll();
      setUsers(users);
    };

    getUsers();
  }, []);

  return (
    <div className='dashboardTime'>
      <h3>Número de horas por aluno</h3>
      <div className="chart-container">
        {users &&
          users.map((user) => (
            <div key={user.name} className="bar-container">
              <div
                className="bar"
                style={{ height: `${user.total_time}px` }}
                title={`hours`}
              ></div>
              <span className="bar-label">{getFirstName(user.name)}</span>
              <span className="bar-label">{user.total_time} horas</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardTime;