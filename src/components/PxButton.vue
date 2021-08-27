<template>
  <div class="actions">
    <button class="btn btn-gen-report">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "PxButton",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxButton.scss";
</style>
