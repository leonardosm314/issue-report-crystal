//Functions get data of issues
import { queryApi } from "./getData.js";

export async function getProjectsData(api_host, owner, repo, options) {
  /** Make request path, sample: https://api.github.com/repos/avatar-global/difare/projects */
  const request_url = `${api_host}/repos/${owner}/${repo}/projects`;
  const params = ["state=all", "per_page=100"];

  const projects = await queryApi(request_url, params, options);
  return projects;
}
