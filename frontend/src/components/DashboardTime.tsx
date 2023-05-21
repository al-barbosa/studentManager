import React, { useEffect, useState } from 'react';
import '../styles/DashboardTime.css';
import IUserWithTime from '../interfaces/userWithTimeInterface';
import UserAPI from '../utils/userAPI';

const DashboardTime: React.FC = () => {
  const [users, setUsers] = useState<IUserWithTime[] | null>(null);

  useEffect(() => {
    const userAPI = new UserAPI();

    const getUsers = async () => {
      const users = await userAPI.getAll();
      setUsers(users);
    };

    getUsers();
  }, []);

  return (
    <div>
      <h3>Número de alunos por curso</h3>
      <div className="chart-container">
        {users &&
          users.map((user) => (
            <div key={user.name} className="bar-container">
              <div
                className="bar"
                style={{ height: `${user.total_time}px` }}
                title={`hours`}
              ></div>
              <span className="bar-label">{user.name}</span>
              <span className="bar-label">{user.total_time} horas</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardTime;