<template>
  <div class="table">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PxTableUI",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxTable.scss";
</style>
