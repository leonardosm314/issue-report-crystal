<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <PxTableUI>
      <PxHeaderTable />
      <PxBodyTable
        v-for="issue in issuesArr"
        :key="issue.id"
        :numIssue="issue.numIssue"
        :titleIssue="issue.titleIssue"
        :labels="[]"
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
      numIssue: "",
      titleIssue: "",
      labels: [],
      asigned: "",
      stateIssue: "",
      updated: "",
    });

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
          //Concat information
          issuesArr.value = [...issuesArr.value, objInformationIssues.value];
        });
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    return {
      issuesArr,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
