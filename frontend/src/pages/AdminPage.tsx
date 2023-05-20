import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAPI from '../utils/adminAPI';
import DashboardClasses from '../components/DashboardClasses';
import RegUser from '../components/RegUser';
import DashboardUsers from '../components/DashboardUsers';
import AdminRequest from '../components/AdminRequest';

const AdminPage: React.FC = () => {
  const [adminInfo, setAdminInfo] = useState({ id: '', name: '', email: '' });
  const [selectedBtn, setSelectedBtn] = useState('Dashboard')
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageUser.role !== 'admin') {
      navigate('/');
    }
    
    const localStorageId = localStorageUser.id;

    const adminAPI = new AdminAPI();

    const getInfo = async (id: string) => {
      const adminInfo = await adminAPI.getById(id);
      if (!adminInfo.id) {
        navigate('/');
      }
      setAdminInfo(adminInfo);
    };

    getInfo(localStorageId);
  }, [navigate, adminInfo.id]);

  const handleUser = () => {
    setSelectedBtn('User');
  };

  const handleDashboard = () => {
    setSelectedBtn('Dashboard');
  };

  const handleRequest = () => {
    setSelectedBtn('Request');
  };

  return (
    <div>
      {adminInfo.name && <h1>{adminInfo.name}</h1>}
      <button onClick={handleDashboard}>Dashboard</button>
      <button onClick={handleUser}>Cadastrar usuário</button>
      <button onClick={handleRequest}>Requisições</button>
      { selectedBtn === 'Dashboard' &&
      <div>
        <DashboardClasses /> <DashboardUsers /> 
      </div>}
      { selectedBtn === 'User' &&
      <div>
        <RegUser /> 
      </div>}
      { selectedBtn === 'Request' &&
      <div>
        <AdminRequest />
      </div>}
    </div>
  );
};

export default AdminPage;