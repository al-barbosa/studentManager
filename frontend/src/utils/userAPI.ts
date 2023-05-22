class UserAPI {
  /**
   * Obtém todos os usuários.
   * @returns Promise com um array contendo todos os usuários.
   */
  public getAll = async (): Promise<any[]> => {
    const URL = '/users';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  /**
   * Realiza o login do usuário.
   * @param email O email do usuário.
   * @param password A senha do usuário.
   * @returns Promise com os dados do usuário logado.
   */
  public login = async (email: string, password: string): Promise<any> => {
    const URL = '/users/login';
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const data = await response.json();
    return data;
  }

  /**
   * Obtém os dados de um usuário por ID.
   * @param id O ID do usuário.
   * @returns Promise com os dados de um usuário.
   */
  public getById = async (id: string): Promise<any> => {
    const URL = `/users/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  /**
   * Cria um novo usuário.
   * @param email O email do usuário.
   * @param name O nome do usuário.
   * @param password A senha do usuário.
   * @returns Promise com os dados do novo usuário criado.
   */
  public createNewUser = async (email: string, name: string, password: string): Promise<any> => {
    const URL = '/users';
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        password,
      })
    });
    const data = await response.json();
    return data;
  }
}

export default UserAPI;