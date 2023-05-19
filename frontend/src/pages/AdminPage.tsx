import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAPI from '../utils/adminAPI';
import Dashboard from '../components/Dashboard';
import RegUser from '../components/RegUser';

const AdminPage: React.FC = () => {
  const [adminInfo, setAdminInfo] = useState({ id: '', name: '', email: '' });
  const [selectedBtn, setSelectedBtn] = useState('Dashboard')
  const navigate = useNavigate();
  const { adminId } = useParams();
  const { id: cookiesId } = JSON.parse(document.cookie);

  useEffect(() => {
    const cookies = JSON.parse(document.cookie);
    const cookieId = cookies.id;

    if (!cookieId) {
      navigate('/');
    }

    const adminAPI = new AdminAPI();

    const getInfo = async (id: string) => {
      const adminInfo = await adminAPI.getById(id);
      setAdminInfo(adminInfo);
    };

    getInfo(cookieId);
  }, [navigate]);

  const handleUser = () => {
    // Lógica para navegar para a página de cadastro de usuário
    setSelectedBtn('User');
  };

  const handleDashboard = () => {
    // Lógica para navegar para a página do dashboard
    setSelectedBtn('Dashboard');
  };

  return (
    <div>
      {adminInfo.name && <h1>{adminInfo.name}</h1>}
      <button onClick={handleDashboard}>Dashboard</button>
      <button onClick={handleUser}>Cadastrar usuário</button>
      { selectedBtn === 'Dashboard' ? 
      <Dashboard /> : <RegUser /> }
    </div>
  );
};

export default AdminPage;