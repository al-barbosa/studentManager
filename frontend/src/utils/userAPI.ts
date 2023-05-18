class UserAPI {
  public getAll = async () => {
    const URL = '/users';
    const response = await fetch(URL);
    console.log(response)
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

  // Outros métodos relacionados ao usuário, como recuperar informações do usuário, criar usuário, etc.
}

export default UserAPI;