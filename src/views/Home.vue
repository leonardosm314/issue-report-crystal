<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <PxTableUI>
      <PxHeaderTable :titleArr="titlesMainTable" />
      <PxBodyTable
        v-for="issue in store.issuesArr"
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
    <PxPaginationTable />

    <PxButton />
  </div>
</template>

<script>
import { inject, ref } from "vue";
//UI
import PxTableUI from "@/components/Table/PxTableUI";
import PxHeaderTable from "@/components/Table/PxHeaderTable";
import PxBodyTable from "@/components/Table/PxBodyTable";
import PxPaginationTable from "@/components/Table/PxPaginationTable";
import PxButton from "@/components/PxButton";
import PxFilter from "@/components/PxFilter";

export default {
  name: "Home",
  components: {
    PxTableUI,
    PxHeaderTable,
    PxBodyTable,
    PxPaginationTable,
    PxButton,
    PxFilter,
  },
  setup() {
    const store = inject("storeReportApp");

    const titlesMainTable = ref([
      "Nmro. de issue",
      "Título de issue",
      "Labels",
      "Asignado",
      "Estado",
      "Update",
    ]);

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
