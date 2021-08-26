<template>
  <div class="table__header">
    <div
      class="table__header-title"
      v-for="(title, index) in titles"
      :key="index"
    >
      <h3 v-text="title"></h3>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "PxHeaderTable",
  setup() {
    const titles = ref([
      "Nmro. de issue",
      "Título de issue",
      "Labels",
      "Asignado",
      "Estado",
      "Update",
    ]);

    return {
      titles,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxHeaderTable.scss";
</style>
