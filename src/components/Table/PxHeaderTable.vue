<template>
  <tr class="table__header">
    <th
      class="table__header-title"
      v-for="(title, index) in titleArr"
      :key="index"
    >
      <h3 v-text="titleArr[index]"></h3>
    </th>
  </tr>
</template>

<script>
export default {
  name: "PxHeaderTable",
  props: {
    titleArr: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxHeaderTable.scss";
</style>
