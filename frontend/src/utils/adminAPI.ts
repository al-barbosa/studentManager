import IAdmin from "../interfaces/adminInterface"

class AdminAPI {
  /**
   * Obtém todos os administradores.
   * @returns Promise com um array contendo todos os administradores.
   */
  public getAll = async (): Promise<IAdmin[]> => {
    const URL = '/admins';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  /**
   * Realiza o login de um administrador.
   * @param email O email do administrador.
   * @param password A senha do administrador.
   * @returns Promise com os dados do administrador logado.
   */
  public login = async (email: string, password: string): Promise<IAdmin> => {
    const URL = '/admins/login';
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
   * Obtém os dados de um administrador por ID.
   * @param id O ID do administrador.
   * @returns Promise com os dados de um administrador.
   */
  public getById = async (id: string): Promise<IAdmin> => {
    const URL = `/admins/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
}

export default AdminAPI;
