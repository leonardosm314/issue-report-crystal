import { queryApi } from "./getData.js";

export async function getIssuesData(api_host, owner, repo, issue_id, options) {
  /** Make request path, sample: https://api.github.com/repos/avatar-global/difare/issues?state=all&per_page=100&page=1 */
  const request_url = `${api_host}/repos/${owner}/${repo}/issues/${issue_id}`;
  const params = ["state=all", "sort=created", "direction=asc", "per_page=100"];

  const issues = await queryApi(request_url, params, options);
  return issues;
}
