import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import '../styles/DashboardClasses.css'
import IUser from '../interfaces/userInterface';

const DashboardClasses: React.FC = () => {
  const [categories, setCategories] = useState<IUser[]|null>(null)

  useEffect(() => {
    const userAPI = new UserAPI();

    const getCat = async () => {
      const allUsers = await userAPI.getAll();
      setCategories(allUsers);
    };

    getCat();
  }, []);

  return (
    <div>
      <h3>Número de alunos por curso</h3>
      <div className="chart">
        {categories && categories.map((category) => (
          <div
            key={category.id}
            className="bar"
            style={{ height: `${category.users.length * 100}px` }}
          >
            <span className="label1">{category.name}</span>
            <span className="label2">{category.users.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardClasses;