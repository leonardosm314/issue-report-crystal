<template>
  <div :class="className" :data-state-button="isActive">
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
    isActive: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxButton.scss";
</style>
