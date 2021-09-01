// import { progressReader } from "./progressResponse.js";

export async function queryApi(request_path, params, options) {
  // const streamProcessor = progressReader(); // 11
  let page = 0;
  let data = [];
  let json_data;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);
  /** Do request call per page, until the next page have empty records */
  do {
    /** Make api request url with request api and params */
    const request_url = `${request_path}?${params
      .concat([`page=${++page}`])
      .join("&")}`;

    /** Call request and parse the result to json */
    let response = await fetch(request_url, {
      ...options,
      ...controller.signal,
    });
    json_data = await response.json();
    data = data.concat(json_data);
    localStorage.setItem("valueTimeOut", id);
    clearTimeout(id);
  } while (
    json_data.length != 0 &&
    json_data.length != null
  ); /** Condition for exit */

  return data;
}
