<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <slot v-if="stateLoaderUI">
      <PxLoader />
    </slot>
    <slot v-else>
      <PxTableUI>
        <PxHeaderTable :titleArr="titlesMainTable" />
        <PxBodyTable
          v-for="(issue, index) in arrIssues"
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
            (pageNumber - 1) * pageSize <= index &&
              pageNumber * pageSize > index
          "
        />
      </PxTableUI>
      <PxActionsTable
        :arrIssue="arrIssues"
        :pageNumber="pageNumber"
        :pageSize="pageSize"
        :nextPage="handleNextPage"
        :previusPage="handlePreviusPage"
      />
    </slot>

    <!-- Menu UI -->
    <PxMenuUI :issuesToPrint="arrIssues" />
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
//UI
import PxTableUI from "@/components/Table/PxTableUI";
import PxHeaderTable from "@/components/Table/PxHeaderTable";
import PxBodyTable from "@/components/Table/PxBodyTable";
import PxActionsTable from "@/components/Table/PxActionsTable";
import PxFilter from "@/components/Filter/PxFilterUI";
import PxMenuUI from "@/components/Menu/PxMenuUI";
import PxLoader from "@/components/Loader/PxLoader";
//Utils
//Get variables for get info
import {
  OWNER,
  REPOSITORY,
  HOST,
  OPTIONS,
} from "@/utils/getOptionsToConnectApi";
//Get projects
import { getProjectsData } from "@/utils/getProjects.js";
//Get project columns data
import { getProjectColumnsData } from "@/utils/getProjectColumn.js";
//Get card cada for column
import { getColumnCardsData } from "@/utils/getColumnCard.js";
//Get project card data
import { getProjectCardsData } from "@/utils/getProjectCardData.js";
//Get issues Data
import { getIssuesData } from "@/utils/getIssuesDataById.js";
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
    const store = useStore();

    const stateLoaderUI = computed(() => store.state.loaderStateUI);

    const titlesMainTable = ref([
      "Nmro. de issue",
      "Título de issue",
      "Labels",
      "Titulo columna",
      "Asignado",
      "Estado",
      "Update",
    ]);

    const arrIssues = ref([]);

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

    const pageNumber = ref(1);
    const pageSize = ref(20);

    const getIssues = async () => {
      try {
        const projects = await getProjectsData(
          HOST,
          OWNER,
          REPOSITORY,
          OPTIONS
        );
        projects.forEach(async (projec) => {
          let projectId = projec.id;
          let projectsColumn = await getProjectColumnsData(
            projectId,
            HOST,
            OPTIONS
          );
          for (const project_column of projectsColumn) {
            let projectColumnId = project_column.id;
            const columnCardData = await getColumnCardsData(
              projectColumnId,
              HOST,
              OPTIONS
            );
            const dataCardsAndColumn = getProjectCardsData(
              project_column,
              columnCardData
            );
            dataCardsAndColumn.forEach(async (data_card) => {
              const infoIssues = await getIssuesData(
                HOST,
                OWNER,
                REPOSITORY,
                data_card.issue_id,
                OPTIONS
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
              arrIssues.value = [
                ...arrIssues.value,
                objInformationIssues.value,
              ];

              //Order array objects issues
              arrIssues.value.sort((a, b) => {
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

    const handleNextPage = () => {
      pageNumber.value++;
    };

    const handlePreviusPage = () => {
      pageNumber.value--;
    };

    onMounted(async () => {
      await getIssues();
    });

    watchEffect(() => {
      if (arrIssues.value.length < 470) {
        store.dispatch("setShowLoaderUIState");
      } else {
        store.dispatch("setHideLoaderUIState");
      }
    });

    return {
      arrIssues,
      titlesMainTable,
      pageNumber,
      pageSize,
      handleNextPage,
      handlePreviusPage,
      stateLoaderUI,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
