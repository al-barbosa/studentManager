import React, { useState } from 'react';
import UserLogin from '../components/UserLogin';
import AdminLogin from '../components/AdminLogin';
import '../styles/Login.css'

type LoginType = 'user' | 'admin';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('user');

  const handleLogin = (type: LoginType) => {
    setLoginType(type);
  };

  return (
    <div className='loginPage'>
      <div className="loginInfo">
        <div className='chooseBtns'>
          <button className={`userBtn ${loginType !== 'user' ? 'unselected' : ''}`} onClick={() => handleLogin('user')}>User Login</button>
          <button className={`adminBtn ${loginType !== 'admin' ? 'unselected' : ''}`} onClick={() => handleLogin('admin')}>Admin Login</button>
        </div>
        {loginType === 'user' && <UserLogin />}
        {loginType === 'admin' && <AdminLogin />}
      </div>
    </div>
  );
};

export default LoginPage;
