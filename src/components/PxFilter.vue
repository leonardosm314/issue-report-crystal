<template>
  <section class="filter">
    <h3>Filtros</h3>

    <form action="" class="filter__form">
      <PxInputFilterfrom nameInput="Labels" />
      <PxInputFilterfrom nameInput="Asignado" />
    </form>
  </section>
</template>

<script>
import PxInputFilterfrom from "./Filter/PxInputFilter";

export default {
  name: "PxFilter",
  components: {
    PxInputFilterfrom,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
