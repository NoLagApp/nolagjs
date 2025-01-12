import { dataType } from "../constants";
import { IDeviceQuery } from "../interfaces";

export const generateQueryString = (query?: IDeviceQuery) => {
  if (!query) return "";

  const queryArray: string[] = [];
  const queryObject = query as unknown as dataType<IDeviceQuery>;
  Object.keys(queryObject).map((key) => {
    queryArray.push(`${key}=${queryObject[key]}`);
  });
  const queryString = queryArray.join("&");
  return queryString ? `?${queryString}` : "";
};
