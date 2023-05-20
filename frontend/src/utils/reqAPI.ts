class RequestAPI {
  public getAll = async () => {
    const URL = '/requests';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  public async newRequest(user_id: string, category_id: string) {
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

  public async deleteRequest(id: string) {
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

  public async acceptRequest(user_id: number, categories_id: number) {
    const URL = `/requests/${user_id}/${categories_id}`;
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