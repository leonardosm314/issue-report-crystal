<template>
  <table class="table" id="js_table-UI">
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PxTableUI",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxTable.scss";
</style>
