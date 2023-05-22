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

  const adminAPI = new AdminAPI();
  const navigate = useNavigate();

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
  }

  /**
   * Remove o item 'user' do localStorage.
   */
  const eraseLocalStorage = (): void => {
    localStorage.removeItem('user');
  };

  /**
   * Envia do formulário de login do administrador e redireciona para próxima página.
   * @param e O evento de envio do formulário.
   */
  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
      <form onSubmit={handleAdminLogin}>
        <div className='loginForm'>
          <input
            className='emailInput'
            type='text'
            name='email'
            placeholder='Email do administrador'
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

export default AdminLogin;
