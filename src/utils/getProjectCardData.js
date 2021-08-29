export function getProjectCardsData(project_columns, cards) {
  let issuesInfo = [];
  cards.forEach((card) => {
    issuesInfo.push({
      col_id: project_columns.id,
      col_name: project_columns.name,
      issue_id: card.issue_id,
    });
  });
  return issuesInfo;
}
