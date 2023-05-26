import { useNavigate } from 'react-router-dom';
import getFirstName from '../utils/getFirstName';
import logout from '../imgs/logout.png';
import '../styles/Header.css'

const Header: React.FC<{ name: string }> = ({ name }) => {
  const navigate = useNavigate();
  
  const eraseLocalStorage = (): void => {
    localStorage.removeItem('user');
  };

  const handleLogout = (): void => {
    eraseLocalStorage();
    navigate(`/`);
  };  

  return (
    <div className='headerContainer'>
      <h1 className='headerName'>{getFirstName(name)}</h1>
      <div className="logoutContainer">
        <button className='logoutBtn' onClick={handleLogout}>
          <img src={logout} alt="Imagem da categoria" width="30" height="30"></img>
          <div className="logout">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Header;