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
  const [selectedBtn, setSelectedBtn] = useState<'Dashboard' | 'User' | 'Request'>('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageUser.role !== 'admin') {
      navigate('/');
    }

    const localStorageId = localStorageUser.id;

    const adminAPI = new AdminAPI();

    /**
     * Função assíncrona para buscar as informações do administrador e atualizar o estado 'adminInfo'.
     * Redireciona para a página inicial se o administrador não for encontrado.
     * @param id O ID do administrador.
     */
    const getInfo = async (id: string): Promise<void> => {
      const adminInfo = await adminAPI.getById(id);
      if (!adminInfo.id) {
        navigate('/');
      }
      setAdminInfo(adminInfo);
    };

    getInfo(localStorageId);
  }, [navigate, adminInfo.id]);

  /**
   * Define o botão selecionado como "User".
   */
  const handleUser = (): void => {
    setSelectedBtn('User');
  };

  /**
   * Define o botão selecionado como "Dashboard".
   */
  const handleDashboard = (): void => {
    setSelectedBtn('Dashboard');
  };

  /**
   * Define o botão selecionado como "Request".
   */
  const handleRequest = (): void => {
    setSelectedBtn('Request');
  };


  return (
    <div>{adminInfo && <Header name={adminInfo.name} />}
      <div className="adminPage">
        <div className="buttonAdmContainer">
          <button
            className={selectedBtn === 'Dashboard' ? 'selected1 admBtn' : 'unselected1 admBtn'}
            onClick={handleDashboard}
          >
            Dashboard
          </button>
          <button
            className={selectedBtn === 'User' ? 'selected2 admBtn' : 'unselected2 admBtn'}
            onClick={handleUser}
          >
            Cadastro
          </button>
          <button
            className={selectedBtn === 'Request' ? 'selected3 admBtn' : 'unselected3 admBtn'}
            onClick={handleRequest}
          >
            Requisições
          </button>
        </div>
        {selectedBtn === 'Dashboard' && (
          <div>
            <DashboardTime />
            <DashboardUsers />
          </div>
        )}
        {selectedBtn === 'User' && (
          <div>
            <RegUser />
          </div>
        )}
        {selectedBtn === 'Request' && (
          <div>
            <AdminRequest />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;