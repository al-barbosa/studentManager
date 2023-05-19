import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAPI from '../utils/adminAPI';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { id: cookiesId } = JSON.parse(document.cookie);


  useEffect(() => {
    const cookies = JSON.parse(document.cookie);
    const userId = cookies.id;
    const adminAPI = new AdminAPI()

    if (!userId) {
      navigate('/');
    }

    // const getInfo = async (id: string) => {
    //   const adminInfo = await adminAPI()
    // }

  }, [navigate]);

  return (
    <div>
      <h2>User Page</h2>
      {/* Conteúdo da página do usuário */}
    </div>
  );
};

export default UserPage;