import React from 'react';
import ICategory from '../interfaces/categoryInterface';
import IUserWithTime from '../interfaces/userWithTimeInterface';
import getYear from '../utils/getYear';
import sigma from '../imgs/sigma.png';
import hourglass from '../imgs/hourglass.png';
import clock from '../imgs/clock.png';
import imageMapping from '../utils/imageMapping';
import checkMediaSize from '../utils/checkMediaSize';
import '../styles/UserCats.css';

const UserCats: React.FC<{
  category: ICategory[];
  userInfo: IUserWithTime;
}> = ({ category, userInfo }) => {
  /**
   * Mapeamento das barras baseado no ID da categoria.
   */
  // 
  const barMapping: { [key: number]: string } = {
    1: "insideBar1",
    2: "insideBar2",
    3: "insideBar3",
    4: "insideBar4",
    5: "insideBar5",
  };

  return (
    <div className="userCats">
      <div className="infoHeader">
        <div className="moreInfo">
          <div className="infoContainer">
            <div className="infoImg">
              <img src={sigma} alt="Somatório" width="30" height="30"></img>
            </div>
            <div className="infoText">
              <p className="infoHead">Categorias</p>
              <p className='infoInfo'>{userInfo.category?.length}</p>
            </div>
          </div>
        </div>
        <div className="moreInfo">
          <div className="infoContainer">
            <div className="infoImg">
              <img src={clock} alt="Relógio" width="30" height="30"></img>
            </div>
            <div className="infoText">
              <p className="infoHead">Horas</p>
              <p className='infoInfo'>{userInfo.total_time}</p>
            </div>
          </div>
        </div>
        <div className="moreInfo">
          <div className="infoContainer">
            <div className="infoImg">
              <img src={hourglass} alt="Ampulheta" width="30" height="30"></img>
            </div>
            <div className="infoText">
              <p className="infoHead">Desde</p>
              <p className='infoInfo'>{getYear(userInfo.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mainCat">
        <div>
          <h3>Categorias cadastradas:</h3>
          <div className="catList">
            {category ? (
              category.map((cat) => (
                <li className="listItem" key={cat.id}>
                  <div className="catContiner">
                    <img src={imageMapping[cat.id]} alt="Imagem da categoria" width={checkMediaSize()} height={checkMediaSize()}></img>
                    <div className="catListText">
                      <div className="catListName">{cat.name}</div>
                      <div className="progressBar">
                        <div className={barMapping[cat.id]}></div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <h2>Sem categorias cadastradas</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCats;
