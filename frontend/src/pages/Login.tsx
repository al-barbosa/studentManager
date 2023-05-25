import React, { useState } from 'react';
import UserLogin from '../components/UserLogin';
import AdminLogin from '../components/AdminLogin';
import '../styles/Login.css';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');

  /**
   * Altera o tipo de login para exibir o formulário correspondente.
   * @param type O tipo de login ('user' ou 'admin').
   */
  const handleLogin = (type: 'user' | 'admin'): void => {
    setLoginType(type);
  };

  return (
    <div className='loginPage'>
      <div className="backGround">
        <div className="loginInfo">
          <div className='chooseBtns'>
            <button className={`userBtn ${loginType !== 'user' ? 'unselected' : ''}`} onClick={() => handleLogin('user')}>User Login</button>
            <button className={`adminBtn ${loginType !== 'admin' ? 'unselected' : ''}`} onClick={() => handleLogin('admin')}>Admin Login</button>
          </div>
          {loginType === 'user' && <UserLogin />}
          {loginType === 'admin' && <AdminLogin />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;