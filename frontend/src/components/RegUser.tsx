import React, { useState } from 'react';
import IUser from '../interfaces/userInterface';
import UserAPI from '../utils/userAPI';
import '../styles/RegUser.css';

const RegUser: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [createdUser, setCreatedUser] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const userAPI: UserAPI = new UserAPI();

  /**
   * Realiza validação do password.
   */
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  /**
   * Atualiza os estados com base na mudança de valor dos inputs.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === 'password') {
      setValidPassword(validatePassword(value));
    }
  };

  /**
   * Realiza envio do formulário de criação de novo usuário.
   * @param e O evento de mudança de valor do input.
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const { name, email, password } = user;

    if (!name || !email || !password || password.length < 6) {
      return;
    }

    const nUser = await userAPI.createNewUser(email, name, password);
    if (nUser.id) {
      setErrorMessage('');
      setUser({
        name: '',
        email: '',
        password: '',
      });
      setCreatedUser(false);
    }
    if (nUser.message) {
      setErrorMessage(nUser.message);
    }
  };

  /**
  * Exclui informações contidas no estado.
  */
  const handleNewRegister = (): void => {
    setErrorMessage('');
    setCreatedUser(true);
  };

  return (
    <div>
      {createdUser ? (
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
            <button
              type="submit"
              disabled={!user.name || !user.email || !user.password || user.password.length < 6}
            >
              Efetuar cadastro
            </button>
            {!validPassword && (
              <p className="errorText">No mínimo 6 caracteres para senha</p>
            )}
            {errorMessage && <span id="errorMessage">{errorMessage}</span>}
          </form>
        </div>
      ) : (
        <div>
          <h3>Novo usuário cadastrado com sucesso!</h3>
          <span>{`Cadastro de ${user.name} realizado com sucesso!`}</span>
          <button type="button" onClick={handleNewRegister}>
            Registrar novo usuário
          </button>
        </div>
      )}
    </div>
  );
};

export default RegUser;
