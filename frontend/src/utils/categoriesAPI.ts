class CategoriesAPI {
  public getAll = async () => {
    const URL = '/categories';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
}

export default CategoriesAPI;