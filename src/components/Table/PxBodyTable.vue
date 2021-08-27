<template>
  <tr class="table__body-item">
    <td class="table__body-value">#{{ numIssue }}</td>
    <td class="table__body-value title-issue">{{ titleIssue }}</td>
    <td class="table__body-value label-content">
      <span
        class="label"
        v-for="label in labels"
        :key="label.id"
        :data-label="label.name"
        :style="{
          background: `rgba(${label.color}, 0.45)`,
          border: `1px solid rgb(${label.color})`,
        }"
      >
        {{ label.name }}
      </span>
    </td>
    <td class="table__body-value">
      <slot v-if="avatarUrl !== ''">
        <!-- <img :src="avatarUrl" :alt="asigned" /> -->
        <span>
          {{ asigned }}
        </span>
      </slot>
    </td>
    <td class="table__body-value" :data-state="stateIssue">
      {{ stateIssue }}
    </td>
    <td class="table__body-value">{{ updatedIssue }}</td>
  </tr>
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
