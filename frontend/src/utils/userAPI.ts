class UserAPI {
  public getAll = async () => {
    const URL = '/users';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  public async login(email: string, password: string) {
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

  public getById = async (id: string) => {
    const URL = `/users/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
  
  public async createNewUser(email: string, name: string, password: string) {
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