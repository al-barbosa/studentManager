import React, { useEffect, useState } from 'react';
import CategoriesAPI from '../utils/categoriesAPI';
import ICategory from '../interfaces/categoryInterface';
import '../styles/DashboardClasses.css'

const DashboardClasses: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]|null>(null)

  useEffect(() => {
    const categoriesAPI = new CategoriesAPI();

    const getCat = async () => {
      const categories = await categoriesAPI.getAll();
      setCategories(categories);
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