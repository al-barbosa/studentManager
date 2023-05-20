import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAPI from '../utils/adminAPI';

interface LoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    eraseLocalStorage();
  }, []);

  const eraseLocalStorage = (): void => {
    localStorage.removeItem('user');
  };

  const adminAPI = new AdminAPI();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    eraseLocalStorage();
    const loggedAdmin = await adminAPI.login(loginForm.email, loginForm.password);
    if (loggedAdmin.message) {
      eraseLocalStorage();
      setErrorMessage(loggedAdmin.message);
    }
    if (loggedAdmin.id) {
      const adminWithRole = { ...loggedAdmin, role: 'admin' };
      setErrorMessage('');
      localStorage.setItem('user', JSON.stringify(adminWithRole));
      navigate(`/admin`);
    }
  };  

  return (
    <div>
      <h3>Admin Login</h3>
      <form onSubmit={handleAdminLogin}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={loginForm.password}
          onChange={handleInputChange}
        />
        <button type="submit">Entrar</button>
      </form>
      {errorMessage && <span id="errorMessage">{errorMessage}</span>}
    </div>
  );
};

export default AdminLogin;