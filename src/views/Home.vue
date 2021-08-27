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
          v-show="
            (store.pageNumber - 1) * store.pageSize <= index &&
              store.pageNumber * store.pageSize > index
          "
        />
      </PxTableUI>
      <PxPaginationTable />
    </slot>

    <PxButton
      className="actions"
      classNameButton="btn btn-gen-report"
      @click="handleExportXLSX"
    >
      <font-awesome-icon icon="file-excel" />
    </PxButton>
    <PxButton
      className="action__refresh-table"
      classNameButton="btn btn-refresh-table"
      @click="handleUpdateIssues"
    >
      <font-awesome-icon icon="sync" />
    </PxButton>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import XLSX from "xlsx";
//UI
import PxTableUI from "@/components/Table/PxTableUI";
import PxHeaderTable from "@/components/Table/PxHeaderTable";
import PxBodyTable from "@/components/Table/PxBodyTable";
import PxPaginationTable from "@/components/Table/PxPaginationTable";
import PxButton from "@/components/PxButton";
import PxFilter from "@/components/PxFilter";
import PxLoader from "@/components/Loader/PxLoader";
//Utils
import { queryApi } from "@/utils/getData";
import { hexToRgb } from "@/utils/getHexToRGB";
//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileExcel, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faFileExcel, faSync);

export default {
  name: "Home",
  components: {
    PxTableUI,
    PxHeaderTable,
    PxBodyTable,
    PxPaginationTable,
    PxButton,
    PxFilter,
    PxLoader,
    FontAwesomeIcon,
  },
  setup() {
    const store = inject("storeReportApp");

    let { api_host, owner, repo, options } = store.value;

    const titlesMainTable = ref([
      "Nmro. de issue",
      "Título de issue",
      "Labels",
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
        const API_URL = `${api_host}/repos/${owner}/${repo}/issues`;
        const params = [
          "state=all",
          "sort=created",
          "direction=asc",
          "per_page=100",
        ];
        const issues = await queryApi(API_URL, params, options);
        issues.forEach((issue) => {
          //Set value that i needed
          objInformationIssues.value = {
            id_issue: issue.id,
            num_issue: issue.number,
            title_issue: issue.title,
            labels: [],
            asignedUserName:
              issue.assignee !== null ? issue.assignee.login : "",
            asignedUserAvatar:
              issue.assignee !== null ? issue.assignee.avatar_url : "",
            state_issue: issue.state,
            updated: `${issue.updated_at.split("T")[0]}`,
            url_issue: issue.html_url,
          };

          //get labels
          issue.labels.forEach((label) => {
            labelsIssue.value = {
              idLabe: label.id,
              color: `${hexToRgb(label.color).r}, ${hexToRgb(label.color).g}, ${
                hexToRgb(label.color).b
              }`,
              name: label.name,
            };
            objInformationIssues.value.labels = [
              ...objInformationIssues.value.labels,
              labelsIssue.value,
            ];
          });

          //Concat information
          store.value.issuesArr = [
            ...store.value.issuesArr,
            objInformationIssues.value,
          ];
        });
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    const handleExportXLSX = () => {
      let data = XLSX.utils.json_to_sheet(store.value.issuesArr);
      const workbook = XLSX.utils.book_new();
      const filename = "crystal-issues";
      const date = new Date();
      const fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}-${fullDate}.xlsx`);
    };

    const handleUpdateIssues = async () => {
      store.value.load = true;

      const index = store.value.issuesArr.findIndex(
        (item) => item.id_issue == item.id_issue
      );

      store.value.issuesArr = [
        ...store.value.issuesArr.slice(0, index),
        ...store.value.issuesArr.slice(index),
      ];

      setTimeout(() => {
        store.value.load = false;
      }, 1000);
    };

    onMounted(async () => {
      store.value.load = true;
      await getIssues();
      setTimeout(() => {
        store.value.load = false;
      }, 1000);
    });

    return {
      store,
      titlesMainTable,
      handleExportXLSX,
      handleUpdateIssues,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
