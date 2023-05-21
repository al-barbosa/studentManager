import React, { useEffect, useState } from 'react';
import RequestAPI from '../utils/reqAPI';
import IRequest from '../interfaces/requestInterface';
import '../styles/AdminRequest.css'

const AdminRequest: React.FC = () => {
  const [requests, setRequests] = useState<IRequest[] | null>(null);

  useEffect(() => {
    const requestAPI = new RequestAPI();

    const getRequests = async () => {
      const reqInfo: IRequest[] = await requestAPI.getAll();
      setRequests(reqInfo);
    };

    getRequests();
  }, []);

  const requestAPI = new RequestAPI();

  const handleDeleteRequest = async (id: number) => {
    await requestAPI.deleteRequest(`${id}`);
    const updatedRequests = requests?.filter((request) => request.id !== id);
    setRequests(updatedRequests || null);
  };

  const handleConfirmRequest = async (userId: number, categoryId: number, id: number) => {
    await requestAPI.acceptRequest(userId, categoryId);
    const updatedRequests = requests?.filter((request) => request.id !== id);
    setRequests(updatedRequests || null);
  };

  return (
    <div className='adminRequests'>
      <h3>Requisições em aberto</h3>
      <div className="reqContainer">
        {requests &&
          requests.map((request) => (
            <div className="reqBody">
              <div className='reqId' key={request.id}>
                <p>#{request.id}</p>
              </div>
                <div className="reqLeft">
                  <div className="reqInfo">
                    <p>Usuário: {request.user.name}</p>
                    <p>Categoria: {request.category.name}</p>
                  </div>
                  <div className="reqsBtn">
                    <button className='accBtn' onClick={() => handleConfirmRequest(request.user.id, request.category.id, request.id)}>Confirmar</button>
                    <button className='dltBtn' onClick={() => handleDeleteRequest(request.id)}>Deletar</button>
                  </div>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminRequest;