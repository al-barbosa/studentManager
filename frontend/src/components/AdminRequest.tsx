import React, { useEffect, useState } from 'react';
import RequestAPI from '../utils/reqAPI';
import IRequest from '../interfaces/requestInterface';

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
    <div>
      <h3>Requisições em aberto</h3>
      {requests &&
        requests.map((request) => (
          <div key={request.id}>
            <p>ID: {request.id}</p>
            <p>Usuário: {request.user.name}</p>
            <p>Categoria: {request.category.name}</p>
            <button onClick={() => handleDeleteRequest(request.id)}>Deletar</button>
            <button onClick={() => handleConfirmRequest(request.user.id, request.category.id, request.id)}>Confirmar</button>
          </div>
        ))}
    </div>
  );
};

export default AdminRequest;
