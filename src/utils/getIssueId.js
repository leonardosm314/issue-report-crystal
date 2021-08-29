export function getIssueId(content_url) {
  // https://api.github.com/repos/avatar-global/difare/issues/189
  const re = new RegExp("https://api.github.com/.*/issues/[0-9]+");
  if (re.test(content_url))
    return content_url.split(
      new RegExp("^https://api.github.com/repos/.*/issues/")
    )[1];
  else return "";
}
