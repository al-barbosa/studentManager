import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAPI from '../utils/adminAPI';
import DashboardTime from '../components/DashboardTime';
import DashboardUsers from '../components/DashboardUsers';
import RegUser from '../components/RegUser';
import AdminRequest from '../components/AdminRequest';
import IAdmin from '../interfaces/adminInterface';
import Header from '../components/Header';
import '../styles/AdminPage.css' 

const AdminPage: React.FC = () => {
  const [adminInfo, setAdminInfo] = useState<IAdmin>({ id: '', name: '', email: '' });
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
    <div className='adminPage'>
      {adminInfo && <Header name={adminInfo.name}/>}
      <button className={selectedBtn === 'Dashboard' ? 'selectedBtn dashBtn' : 'otherBtn dashBtn'} onClick={handleDashboard}>Dashboard</button>
      <button className={selectedBtn === 'User' ? 'selectedBtn userBtn' : 'otherBtn userBtn'} onClick={handleUser}>Cadastrar usuário</button>
      <button className={selectedBtn === 'Request' ? 'selectedBtn reqBtn' : 'otherBtn reqBtn'} onClick={handleRequest}>Requisições</button>
      { selectedBtn === 'Dashboard' &&
      <div>
        <DashboardTime /> <DashboardUsers /> 
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