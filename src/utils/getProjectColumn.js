//Functions get data of issues
import { queryApi } from "./getData.js";

export async function getProjectColumnsData(project_id, api_host, options) {
  /** Make request path, sample: https://api.github.com/projects/10610104/columns?per_page=100&page=1 */
  const request_url = `${api_host}/projects/${project_id}/columns`;

  const params = ["per_page=100"];

  const project_columns = await queryApi(request_url, params, options);

  return project_columns;

}
