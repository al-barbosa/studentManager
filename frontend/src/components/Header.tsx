import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'
import getFirstName from '../utils/getFirstName';

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
      <button className='logoutBtn' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;