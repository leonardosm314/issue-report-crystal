<template>
  <section class="action__table">
    <div class="action__table-input">
      <span>
        ¿Cuantos issues deseas ver en la tabla?
      </span>
      <input type="text" v-model="store.pageSize" />
    </div>

    <div class="action__table-page-size">
      <p>Mostrar {{ store.pageSize }} issues por pagina:</p>
    </div>

    <PxPaginationTable />
  </section>
</template>

<script>
import PxPaginationTable from "@/components/Table/PxPaginationTable";
import { inject } from "@vue/runtime-core";

export default {
  name: "PxActionsTable",
  components: {
    PxPaginationTable,
  },
  setup() {
    const store = inject("storeReportApp");

    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxActionsTable.scss";
</style>
