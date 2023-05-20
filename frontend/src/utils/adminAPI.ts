class AdminAPI {
  public getAll = async () => {
    const URL = '/admins';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  public async login(email: string, password: string) {
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

  public getById = async (id: string) => {
    const URL = `/admins/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
}

export default AdminAPI;