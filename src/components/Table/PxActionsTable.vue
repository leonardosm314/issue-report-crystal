<template>
  <section class="action__table">
    <PxPaginationTable
      :arrIssue="arrIssue"
      :pageNumber="pageNumber"
      :pageSize="pageSize"
      :nextPage="nextPage"
      :previusPage="previusPage"
    />
  </section>
</template>

<script>
import PxPaginationTable from "./PxPaginationTable";

export default {
  name: "PxActionsTable",
  props: {
    arrIssue: Array,
    pageNumber: Number,
    pageSize: Number,
    nextPage: Function,
    previusPage: Function,
  },
  components: {
    PxPaginationTable,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxActionsTable.scss";
</style>
