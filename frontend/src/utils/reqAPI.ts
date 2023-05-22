import IRequest from "../interfaces/requestInterface";

class RequestAPI {
  /**
   * Obtém todas as requisições abertas.
   * @returns Promise com um array de requisições.
   */
  public getAll = async (): Promise<IRequest[]> => {
    const URL = '/requests';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  /**
   * Cria uma nova requisição.
   * @param user_id O ID do usuário.
   * @param category_id O ID da categoria.
   * @returns Promise com os dados da nova requisição.
   */
  public newRequest = async (user_id: string, category_id: string): Promise<IRequest> => {
    const URL = '/requests';
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        category_id,
      })
    });
    const data = await response.json();
    return data;
  }

  /**
   * Deleta uma requisição por ID.
   * @param id O ID da requisição a ser deletada.
   * @returns Promise com os dados da requisição deletada.
   */
  public deleteRequest = async (id: string): Promise<IRequest> => {
    const URL = `/requests/${id}`;
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  }

  /**
   * Aceita uma requisição.
   * @param user_id O ID do usuário.
   * @param category_id O ID da categoria.
   * @returns Promise com os dados da requisição aceita.
   */
  public acceptRequest = async (user_id: number, category_id: number): Promise<IRequest> => {
    const URL = `/requests/${user_id}/${category_id}`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  }
}

export default RequestAPI;
