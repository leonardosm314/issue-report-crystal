<template>
  <div :class="className">
    <button :class="classNameButton">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "PxButton",
  props: {
    className: String,
    classNameButton: String,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxButton.scss";
</style>
