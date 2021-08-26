<template>
  <div class="table__body-item">
    <div class="table__body-value">#{{ numIssue }}</div>
    <div class="table__body-value">{{ titleIssue }}</div>
    <div class="table__body-value">bug</div>
    <div class="table__body-value">
      <img :src="avatarUrl" :alt="asigned" />
      <span>
        {{ asigned }}
      </span>
    </div>
    <div class="table__body-value" :data-state="stateIssue">
      {{ stateIssue }}
    </div>
    <div class="table__body-value">{{ updatedIssue }}</div>
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
    avatarUrl: String,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxBodyTable.scss";
</style>
