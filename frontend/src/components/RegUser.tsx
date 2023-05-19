import React, { useState } from 'react';
import IUser from '../interfaces/userInterface';
import UserAPI from '../utils/userAPI';

const RegUser: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });

  const [createdUser, setCreatedUser] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const userAPI: UserAPI = new UserAPI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = user;

    if (!name || !email || !password || password.length < 6) {
      return;
    }

    const nUser = await userAPI.createNewUser(email, name, password);
    if(nUser.id) {
      setErrorMessage('');
      setUser({
        name: '',
        email: '',
        password: '',
      })
      setCreatedUser(false);
    }
    if(nUser.message) {
      setErrorMessage(nUser.message);
    }
  };

  function handleNewRegister(event: any): void {
    setErrorMessage('');
    setCreatedUser(true);
  }

  return (
    <div>
      {createdUser ?
      <div>
        <h2>Cadastrar novo aluno</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder="Nome do Aluno"
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={user.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={user.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit" disabled={!user.name || !user.email || !user.password || user.password.length < 6}>
            Efetuar cadastro
          </button>
          {errorMessage && <span id="errorMessage">{errorMessage}</span>}
        </form>
      </div> :
      <div>
        <h3>Novo usuário cadastrado com sucesso!</h3>
        <span>{`Cadastro de ${user.name} realizado com sucesso!`}</span>
        <button type="button" onClick={handleNewRegister}>Registrar novo usuário</button>
      </div>}
    </div>
  );
};

export default RegUser;
