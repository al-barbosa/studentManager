import React, { useEffect, useState } from 'react';
import UserAPI from '../utils/userAPI';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const UserLogin: React.FC = () => {
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

  const navigate = useNavigate();

  const userAPI: UserAPI = new UserAPI();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loggedUser = await userAPI.login(loginForm.email, loginForm.password);
    if (loggedUser.message) {
      eraseCookies();
      setErrorMessage(loggedUser.message);
    }
    if (loggedUser.id) {
      setErrorMessage('');
      document.cookie = JSON.stringify(loggedUser);
      navigate(`/user/${loggedUser.id}`);
    }
  };


  return (
    <div>
      <h3>User Login</h3>
      <form onSubmit={handleUserLogin}>
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

export default UserLogin;
