"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueryString = void 0;
const generateQueryString = (query) => {
    const queryArray = [];
    const queryObject = query;
    Object.keys(queryObject).map((key) => {
        queryArray.push(`${key}=${queryObject[key]}`);
    });
    const queryString = queryArray.join("&");
    return queryString ? `?${queryString}` : "";
};
exports.generateQueryString = generateQueryString;
//# sourceMappingURL=generateQueryString.js.map