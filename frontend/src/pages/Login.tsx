import React, { useState } from 'react';
import UserLogin from '../components/UserLogin';
import AdminLogin from '../components/AdminLogin';


type LoginType = 'user' | 'admin';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('user');

  const handleLogin = (type: LoginType) => {
    setLoginType(type);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <button onClick={() => handleLogin('user')}>User Login</button>
        <button onClick={() => handleLogin('admin')}>Admin Login</button>
      </div>
      {loginType === 'user' && <UserLogin />}
      {loginType === 'admin' && <AdminLogin />}
    </div>
  );
};

export default LoginPage;
