
export class ApiService {
  baseUrl = "https://api.spacexdata.com/v4";

  async get(path: string) {
    const result = await fetch(`${this.baseUrl}/${path}`);
    return await result.json();
  }

}