<template>
  <div class="table__body-item">
    <div class="table__body-value">#1</div>
    <div class="table__body-value">Issue creado</div>
    <div class="table__body-value">bug</div>
    <div class="table__body-value">LuisDev2001</div>
    <div class="table__body-value">Open</div>
    <div class="table__body-value">17 Set. 2021</div>
  </div>
</template>

<script>
export default {
  name: "PxBodyTable",
  props: {
    numIssue: Number,
    titleIssue: String,
    labels: Array,
    asigned: String,
    stateIssue: String,
    updatedIssue: String,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxBodyTable.scss";
</style>
