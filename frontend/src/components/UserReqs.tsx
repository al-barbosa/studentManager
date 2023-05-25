import React from 'react';
import IRequest from '../interfaces/requestInterface';
import convertDateFormat from '../utils/dateFormat';
import png1 from '../imgs/1.png';
import png2 from '../imgs/2.png';
import png3 from '../imgs/3.png';
import png4 from '../imgs/4.png';
import png5 from '../imgs/5.png';
import '../styles/UserReqs.css';

interface UserReqsProps {
  requests: IRequest[] | null;
}

const UserReqs: React.FC<UserReqsProps> = ({ requests }) => {
  const imageMapping: { [key: number]: string } = {
    1: png1,
    2: png2,
    3: png3,
    4: png4,
    5: png5,
  };

  const checkMediaSize = (): string => {
    const mediaQuery = window.matchMedia("(min-width: 450px)");
    if (mediaQuery.matches) {
      return '60';
    } else {
      return '40';
    }
  };

  return (
    <div className="listReqContainer">
      <h3 className='reqTitle'>Aguardando:</h3>
      <div className='allReqContainer'>
        {requests ? (
          requests.map((req) => (
              <div className="reqContainer" key={req.id}>
                <img src={imageMapping[req.category.id]} alt="Imagem da categoria" width={checkMediaSize()} height={checkMediaSize()}></img>
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
