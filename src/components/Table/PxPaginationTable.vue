<template>
  <div class="pagination">
    <div class="pagination__actions">
      <div class="pagination__actions-previus-page">
        <button @click="previusPage" v-show="store.pageNumber != 1">
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>
      <div class="pagition__number">
        <p>
          {{ store.pageNumber }}
        </p>
      </div>
      <div class="pagination__actions-next-page">
        <button
          @click="nextPage"
          v-show="
            (store.pageNumber * store.pageSize) / store.issuesArr.length < 1
          "
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faChevronRight, faChevronLeft);

export default {
  name: "PxPaginationTable",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = inject("storeReportApp");

    const nextPage = () => {
      store.value.pageNumber++;
    };

    const previusPage = () => {
      store.value.pageNumber--;
    };

    return {
      nextPage,
      previusPage,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxPaginationTable.scss";
</style>
