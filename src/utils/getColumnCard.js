//Functions get data of issues
import { queryApi } from "./getData.js";
import { getIssueId } from "./getIssueId.js";

export async function getColumnCardsData(column_id, api_host, options) {
  /** Make request path, sample: https://api.github.com/projects/columns/12411862/cards */
  const request_url = `${api_host}/projects/columns/${column_id}/cards`;
  const params = ["per_page=100"];

  const column_cards = await queryApi(request_url, params, options);
  const column_cards_updated = column_cards.map((card) => ({
    ...card,
    issue_id: getIssueId(card.content_url),
  }));

  return column_cards_updated;
}
