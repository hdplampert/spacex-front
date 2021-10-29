import { DateUtils } from "../../utils/DateUtils";

export class Launch {
  name?: string;
  date?: Date;
  details?: string;
  success?: boolean;
  patchLink?: string;
  articleLink?: string;
  webcastLink?: string;
  wikipediaLink?: string;
}

export class LaunchMapper {
  apiToModel(json: any) {
    const model = new Launch();
    model.name = json.name;
    model.date = DateUtils.dateFromUnixSeconds(json.date_unix);
    model.details = json.details;
    model.patchLink = json.links?.patch?.small;
    model.articleLink = json.links?.article;
    model.webcastLink = json.links?.webcast;
    model.wikipediaLink = json.links?.wikipedia;
    model.success = json.success;
    return model;
  }
}

