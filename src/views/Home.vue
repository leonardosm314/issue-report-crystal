<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <PxTableUI>
      <PxHeaderTable :titleArr="titlesMainTable" />
      <PxBodyTable
        v-for="issue in issuesArr"
        :key="issue.id"
        :numIssue="issue.numIssue"
        :titleIssue="issue.titleIssue"
        :labels="issue.labels"
        :asigned="issue.asignedUserName"
        :avatarUrl="issue.asignedUserAvatar"
        :stateIssue="issue.stateIssue"
        :updatedIssue="issue.updated"
      />
    </PxTableUI>

    <PxButton />
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";

import PxTableUI from "@/components/PxTableUI";
import PxHeaderTable from "@/components/PxHeaderTable";
import PxBodyTable from "@/components/PxBodyTable";
import PxButton from "@/components/PxButton";
//Utils
import { queryApi } from "@/utils/getData";

export default {
  name: "Home",
  components: {
    PxTableUI,
    PxHeaderTable,
    PxBodyTable,
    PxButton,
  },
  setup() {
    const store = inject("storeReportApp");

    let issuesArr = ref([]);
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
    const titlesMainTable = ref([
      "Nmro. de issue",
      "Título de issue",
      "Labels",
      "Asignado",
      "Estado",
      "Update",
    ]);

    const { api_host, owner, repo, options } = store.value;

    onMounted(async () => {
      await getIssues();
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
            asignedUserName: issue.assignee.login,
            asignedUserAvatar: issue.assignee.avatar_url,
            stateIssue: issue.state,
            updated: issue.updated_at,
          };

          //get labels
          issue.labels.forEach((label) => {
            labelsIssue.value = {
              idLabe: label.id,
              color: label.color,
              name: label.name,
            };
            objInformationIssues.value.labels = [
              ...objInformationIssues.value.labels,
              labelsIssue.value,
            ];
          });

          //Concat information
          issuesArr.value = [...issuesArr.value, objInformationIssues.value];
        });
        console.log(issues);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    return {
      issuesArr,
      titlesMainTable,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
