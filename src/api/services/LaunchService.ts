import { Launch, LaunchMapper } from "../models/Launch";
import { ApiService } from "./base/ApiService";

// TODO injeção
export class LaunchService {
  api = new ApiService();
  converter = new LaunchMapper();
  resource = "launches"

  async getUpcomingLaunches(): Promise<Launch[]> {
    const result = await this.api.get("launches/upcoming");
    return result.map((res: any) => this.converter.apiToModel(res));
  }

  async getPastLaunches(): Promise<Launch[]> {
    const result = await this.api.get("launches/past");
    return result.map((res: any) => this.converter.apiToModel(res));
  }
}