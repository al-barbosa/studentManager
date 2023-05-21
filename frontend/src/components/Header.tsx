import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>{name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;