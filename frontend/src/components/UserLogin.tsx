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

  useEffect(() => {
    eraseLocalStorage();
  }, []);

  const navigate = useNavigate();

  const userAPI: UserAPI = new UserAPI();

  /**
   * Atualiza os estados com base na mudança de valor dos inputs.
   * @param e O evento de mudança de valor do input.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  /**
   * Remove o item 'user' do localStorage.
   */
  const eraseLocalStorage = (): void => {
    localStorage.removeItem('user');
  };

  /**
   * Envia do formulário de login do usuário e redireciona para próxima página.
   * @param e O evento de envio do formulário.
   */
  const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const loggedUser = await userAPI.login(loginForm.email, loginForm.password);
    if (loggedUser.message) {
      eraseLocalStorage();
      setErrorMessage(loggedUser.message);
    }
    if (loggedUser.id) {
      const userWithRole = { ...loggedUser, role: 'student' };
      setErrorMessage('');
      localStorage.setItem('user', JSON.stringify(userWithRole));
      navigate(`/user`);
    }
  };

  return (
    <div>
      <form onSubmit={handleUserLogin}>
        <div className='loginForm'>
          <input
            className='emailInput'
            type='text'
            name='email'
            placeholder='Email do aluno'
            value={loginForm.email}
            onChange={handleInputChange}
          />
          <input
            className='passwordInput'
            type='password'
            name='password'
            placeholder='Senha'
            value={loginForm.password}
            onChange={handleInputChange}
          />
          <button className='submitBtn' type='submit'>Entrar</button>
        </div>
      </form>
      {errorMessage && <span id='errorMessage'>{errorMessage}</span>}
    </div>
  );
};

export default UserLogin;