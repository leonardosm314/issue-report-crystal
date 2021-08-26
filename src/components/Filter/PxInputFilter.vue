<template>
  <div class="filter-input">
    <span>{{ nameInput }}</span>
    <input type="text" :placeholder="placeholderInput" />
  </div>
</template>

<script>
export default {
  name: "PxInputFilter",
  props: {
    nameInput: String,
    placeholderInput: String,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxInputFilter.scss";
</style>
