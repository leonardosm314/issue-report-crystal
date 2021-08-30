<template>
  <section class="filter">
    <h3>Filtros</h3>

    <form action="" class="filter__form">
      <PxInputFilter nameInput="Labels" />
      <PxInputFilter nameInput="Asignado" />
    </form>
  </section>
</template>

<script>
import PxInputFilter from "./PxInputFilter";

export default {
  name: "PxFilterUI",
  components: {
    PxInputFilter,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxFilterUI.scss";
</style>
