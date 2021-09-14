<template>
  <section class="filter">
    <div class="filter__body">
      <h3>Filtrar por</h3>

      <form action="" class="filter__form">
        <PxSelectFilter
          nameInput="Selecciona una opcion"
          :arrayOptions="arrOptionsFilter"
          v-model:optionsFilterBy="optionSelectedValue"
        />
        {{ optionSelectedValue }}

        <PxSelectFilter
          nameInput="Selecciona una opcion"
          :arrayOptions="arrOptionsState"
          v-model:optionsFilterBy="optionSelecteStatedValue"
        />
        {{ optionSelecteStatedValue }}

        <!-- <PxButton>
          Filtrar
        </PxButton> -->
      </form>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity";
//UI
import PxSelectFilter from "./PxSelectFilter";
import PxButton from "@/components/PxButton";

export default {
  name: "PxFilterUI",
  components: {
    PxSelectFilter,
    PxButton,
  },
  setup() {
    const arrOptionsFilter = ref(["Estado", "Asignado", "Labels"]);
    const optionSelectedValue = ref("");
    const arrOptionsState = ref(["Closed", "Open"]);
    const optionSelecteStatedValue = ref("");

    return {
      optionSelectedValue,
      arrOptionsFilter,
      arrOptionsState,
      optionSelecteStatedValue,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxFilterUI.scss";
</style>
