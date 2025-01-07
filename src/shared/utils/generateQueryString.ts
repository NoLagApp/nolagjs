import { dataType } from "../constants";
import { IDeviceListQuery } from "../interfaces";

export const generateQueryString = (query?: IDeviceListQuery) => {
  if (!query) return "";

  const queryArray: string[] = [];
  const queryObject = query as unknown as dataType<IDeviceListQuery>;
  Object.keys(queryObject).map((key) => {
    queryArray.push(`${key}=${queryObject[key]}`);
  });
  const queryString = queryArray.join("&");
  return queryString ? `?${queryString}` : "";
};
