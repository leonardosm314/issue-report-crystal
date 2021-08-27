<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <PxTableUI>
      <PxHeaderTable :titleArr="titlesMainTable" />
      <PxBodyTable
        v-for="(issue, index) in store.issuesArr"
        :key="issue.id"
        :numIssue="issue.numIssue"
        :titleIssue="issue.titleIssue"
        :labels="issue.labels"
        :asigned="issue.asignedUserName"
        :avatarUrl="issue.asignedUserAvatar"
        :stateIssue="issue.stateIssue"
        :updatedIssue="issue.updated"
        v-show="
          (store.pageNumber - 1) * store.pageSize <= index &&
            store.pageNumber * store.pageSize > index
        "
      />
    </PxTableUI>
    <PxPaginationTable />

    <PxButton>
      <font-awesome-icon icon="file-excel" />
    </PxButton>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
//UI
import PxTableUI from "@/components/Table/PxTableUI";
import PxHeaderTable from "@/components/Table/PxHeaderTable";
import PxBodyTable from "@/components/Table/PxBodyTable";
import PxPaginationTable from "@/components/Table/PxPaginationTable";
import PxButton from "@/components/PxButton";
import PxFilter from "@/components/PxFilter";
//Utils
import { queryApi } from "@/utils/getData";
import { hexToRgb } from "@/utils/getHexToRGB";
//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faFileExcel);

export default {
  name: "Home",
  components: {
    PxTableUI,
    PxHeaderTable,
    PxBodyTable,
    PxPaginationTable,
    PxButton,
    PxFilter,
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
            idIssue: issue.id,
            numIssue: issue.number,
            titleIssue: issue.title,
            labels: [],
            asignedUserName:
              issue.assignee !== null ? issue.assignee.login : "",
            asignedUserAvatar:
              issue.assignee !== null ? issue.assignee.avatar_url : "",
            stateIssue: issue.state,
            updated: `${issue.updated_at.split("T")[0]}`,
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

    onMounted(async () => {
      await getIssues();
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
