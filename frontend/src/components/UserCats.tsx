import React from 'react';
import ICategory from '../interfaces/categoryInterface';
import IUserWithTime from '../interfaces/userWithTimeInterface';
import convertDateFormat from '../utils/dateFormat';
import '../styles/UserCats.css';
import sigma from '../imgs/sigma.png';
import hourglass from '../imgs/hourglass.png';
import clock from '../imgs/clock.png';
import png1 from '../imgs/1.png';
import png2 from '../imgs/2.png';
import png3 from '../imgs/3.png';
import png4 from '../imgs/4.png';
import png5 from '../imgs/5.png';

const UserCats: React.FC<{
  category: ICategory[];
  userInfo: IUserWithTime;
}> = ({ category,userInfo }) => {
  return (
    <div className="userCats">
      <div className="moreInfo">
        
        
        <div className="nCatsContainer">
          <div className="nCatsText">
            <p className="nCatsHead">Categorais</p>
            <p className='nCatsInfo'>{userInfo.category?.length}</p>
          </div>
          <div className="nCatsImg">
            <img src={sigma} alt="Categorias" width="30" height="30"></img>
          </div>
        </div>

        <p>{convertDateFormat(userInfo.createdAt)}</p>
        <p>{userInfo.total_time}</p>
      <img src={png1} alt="logo" width="30" height="30"></img>
      </div>
      <div className="mainCat">
        <div className="catList">
          <h3>Categorias cadastradas:</h3>
          <ul>
            {category ? (
              category.map((cat) => (
                <li className="listItem" key={cat.id}>
                  <div className="listName">{cat.name}</div>
                </li>
              ))
            ) : (
              <h2>Sem categorias cadastradas</h2>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCats;
