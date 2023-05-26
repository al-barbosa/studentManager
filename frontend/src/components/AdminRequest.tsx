import React, { useEffect, useState } from 'react';
import RequestAPI from '../utils/reqAPI';
import IRequest from '../interfaces/requestInterface';
import '../styles/AdminRequest.css';
import convertDateFormat from '../utils/dateFormat';

const AdminRequest: React.FC = () => {
  const [requests, setRequests] = useState<IRequest[] | null>(null);

  useEffect(() => {
    const requestAPI = new RequestAPI();

    /**
     * Função assíncrona para buscar as requisições e atualizar o estado 'requests'.
     */
    const getRequests = async (): Promise<void> => {
      const reqInfo: IRequest[] = await requestAPI.getAll();
      setRequests(reqInfo);
    };

    getRequests();
  }, []);

  const requestAPI = new RequestAPI();

  /**
   * Exclui uma requisição.
   * @param id O ID da requisição a ser excluída.
   */
  const handleDeleteRequest = async (id: number): Promise<void> => {
    await requestAPI.deleteRequest(`${id}`);
    const updatedRequests = requests?.filter((request) => request.id !== id);
    setRequests(updatedRequests || null);
  };

  /**
   * Confirma uma requisição.
   * @param userId O ID do usuário associado à requisição.
   * @param categoryId O ID da categoria associada à requisição.
   * @param id O ID da requisição a ser confirmada.
   */
  const handleConfirmRequest = async (userId: number, categoryId: number, id: number): Promise<void> => {
    await requestAPI.acceptRequest(userId, categoryId);
    const updatedRequests = requests?.filter((request) => request.id !== id);
    setRequests(updatedRequests || null);
  };

  return (
    <div className="adminRequests">
      <h3>Requisições em aberto</h3>
      <div className="reqContainerAdmin">
        {requests &&
          requests.map((request) => (
            <div className="reqBody" key={request.id}>
              <div className="reqId">
                <p>#{request.id}</p>
              </div>
              <div className="reqLeft">
                <div className="reqInfo">
                  <p>Usuário: {request.user.name}</p>
                  <p>Categoria: {request.category.name}</p>
                  <p>Criado em: {convertDateFormat(request.createdAt)}</p>
                </div>
                <div className="reqsBtn">
                  <button
                    className="accBtn"
                    onClick={() =>
                      handleConfirmRequest(
                        request.user.id,
                        request.category.id,
                        request.id
                      )
                    }
                  >
                    Confirmar
                  </button>
                  <button
                    className="dltBtn"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminRequest;
