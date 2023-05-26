import React from 'react';
import IRequest from '../interfaces/requestInterface';
import convertDateFormat from '../utils/dateFormat';
import imageMapping from '../utils/imageMapping';
import checkMediaSize from '../utils/checkMediaSize';
import '../styles/UserReqs.css';

interface UserReqsProps {
  requests: IRequest[] | null;
}

const UserReqs: React.FC<UserReqsProps> = ({ requests }) => {
  return (
    <div className="listReqContainer">
      <h3 className="reqTitle">Aguardando:</h3>
      <div className="allReqContainer">
        {requests ? (
          requests.map((req) => (
            <div className="reqContainer" key={req.id}>
              <img
                src={imageMapping[req.category.id]}
                alt="Imagem da categoria"
                width={checkMediaSize()}
                height={checkMediaSize()}
              ></img>
              <div className="reqListText">
                <div className="reqListName">{req.category.name}</div>
                <div className="reqCreatedAt">{convertDateFormat(req.createdAt)}</div>
              </div>
            </div>
          ))
        ) : (
          <h2>Sem categorias cadastradas</h2>
        )}
      </div>
    </div>
  );
};

export default UserReqs;
