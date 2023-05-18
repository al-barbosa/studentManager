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


  const eraseCookies = (): void => {
    document.cookie = JSON.stringify({
      email: '',
      id: '',
    });
  };


  useEffect(() => {
    eraseCookies();
  }, []);

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
    const loggedAdmin = await adminAPI.login(loginForm.email, loginForm.password);
    if (loggedAdmin.message) {
      eraseCookies();
      setErrorMessage(loggedAdmin.message);
    }
    if (loggedAdmin.id) {
      setErrorMessage('');
      document.cookie = JSON.stringify(loggedAdmin);
      navigate(`/user/${loggedAdmin.id}`);
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