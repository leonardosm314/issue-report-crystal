<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <slot v-if="store.load">
      <PxLoader />
    </slot>
    <slot v-else>
      <PxTableUI>
        <PxHeaderTable :titleArr="titlesMainTable" />
        <PxBodyTable
          v-for="(issue, index) in store.issuesArr"
          :key="issue.id"
          :numIssue="issue.num_issue"
          :titleIssue="issue.title_issue"
          :labels="issue.labels"
          :asigned="issue.asignedUserName"
          :avatarUrl="issue.asignedUserAvatar"
          :stateIssue="issue.state_issue"
          :updatedIssue="issue.updated"
          :titleColumn="issue.column_name"
          v-show="
            (store.pageNumber - 1) * store.pageSize <= index &&
              store.pageNumber * store.pageSize > index
          "
        />
      </PxTableUI>
      <PxActionsTable />
    </slot>

    <!-- Menu UI -->
    <PxMenuUI />
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
//UI
import PxTableUI from "@/components/Table/PxTableUI";
import PxHeaderTable from "@/components/Table/PxHeaderTable";
import PxBodyTable from "@/components/Table/PxBodyTable";
import PxActionsTable from "@/components/Table/PxActionsTable";
import PxFilter from "@/components/Filter/PxFilterUI";
import PxMenuUI from "@/components/Menu/PxMenuUI";
import PxLoader from "@/components/Loader/PxLoader";
//Utils
//Get projects
import { getProjectsData } from "../utils/getProjects.js";
//Get project columns data
import { getProjectColumnsData } from "../utils/getProjectColumn.js";
//Get card cada for column
import { getColumnCardsData } from "../utils/getColumnCard.js";
//Get project card data
import { getProjectCardsData } from "../utils/getProjectCardData.js";
//Get issues Data
import { getIssuesData } from "../utils/getIssuesDataById.js";
//Convert from hex to rgb
import { hexToRgb } from "@/utils/getHexToRGB";

export default {
  name: "Home",
  components: {
    PxTableUI,
    PxHeaderTable,
    PxBodyTable,
    PxActionsTable,
    PxFilter,
    PxLoader,
    PxMenuUI,
  },
  setup() {
    const store = inject("storeReportApp");

    let { api_host, owner, repo, options } = store.value;

    const titlesMainTable = ref([
      "Nmro. de issue",
      "Título de issue",
      "Labels",
      "Titulo columna",
      "Asignado",
      "Estado",
      "Update",
    ]);

    const objInformationIssues = ref({
      idIssue: 0,
      numIssue: "",
      titleIssue: "",
      labels: [],
      asigned: "",
      stateIssue: "",
      updated: "",
    });

    const labelsIssue = ref({
      idLabe: 0,
      color: "",
      name: "",
    });

    const getIssues = async () => {
      try {
        const projects = await getProjectsData(api_host, owner, repo, options);
        projects.forEach(async (projec) => {
          let projectId = projec.id;
          let projectsColumn = await getProjectColumnsData(
            projectId,
            api_host,
            options
          );
          for (const project_column of projectsColumn) {
            let projectColumnId = project_column.id;
            const columnCardData = await getColumnCardsData(
              projectColumnId,
              api_host,
              options
            );
            const dataCardsAndColumn = getProjectCardsData(
              project_column,
              columnCardData
            );
            dataCardsAndColumn.forEach(async (data_card) => {
              const infoIssues = await getIssuesData(
                api_host,
                owner,
                repo,
                data_card.issue_id,
                options
              );
              infoIssues[0].col_name = data_card.col_name;
              infoIssues[0].col_id = data_card.col_id;

              //Set value that i needed
              objInformationIssues.value = {
                id_issue: infoIssues[0].id,
                num_issue: infoIssues[0].number,
                title_issue: infoIssues[0].title,
                labels: [],
                asignedUserName:
                  infoIssues[0].assignee !== null
                    ? infoIssues[0].assignee.login
                    : "",
                asignedUserAvatar:
                  infoIssues[0].assignee !== null
                    ? infoIssues[0].assignee.avatar_url
                    : "",
                state_issue: infoIssues[0].state,
                updated: `${infoIssues[0].updated_at.split("T")[0]}`,
                url_issue: infoIssues[0].html_url,
                column_name: infoIssues[0].col_name,
              };

              //set labels
              infoIssues[0].labels.forEach((label) => {
                labelsIssue.value = {
                  idLabe: label.id,
                  color: `${hexToRgb(label.color).r}, ${
                    hexToRgb(label.color).g
                  }, ${hexToRgb(label.color).b}`,
                  name: label.name,
                };
                objInformationIssues.value.labels = [
                  ...objInformationIssues.value.labels,
                  labelsIssue.value,
                ];
              });

              // Labels to print in excel
              let objLabelsKeys = {};
              infoIssues[0].labels.forEach((label, index) => {
                objLabelsKeys[label.name] = {
                  [label.name]: label.name,
                };
              });

              for (const key in objLabelsKeys) {
                objInformationIssues.value = {
                  ...objInformationIssues.value,
                  ...objLabelsKeys[key],
                };
              }

              //Concat information
              store.value.issuesArr = [
                ...store.value.issuesArr,
                objInformationIssues.value,
              ];

              //Order array objects issues
              store.value.issuesArr.sort((a, b) => {
                if (a.num_issue < b.num_issue) {
                  return -1;
                }
                if (a.num_issue > b.num_issue) {
                  return 1;
                }
                return 0;
              });
            });
          }
        });
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    onMounted(async () => {
      store.value.load = true;
      await getIssues();

      setTimeout(() => {
        store.value.load = false;
      }, 300);
    });

    return {
      store,
      titlesMainTable,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
