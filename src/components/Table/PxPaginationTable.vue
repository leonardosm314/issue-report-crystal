<template>
  <div class="pagination">
    <div class="pagination__actions">
      <div class="pagination__actions-previus-page">
        <button @click="previusPage" v-show="pageNumber != 1">
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>
      <div class="pagition__number">
        <p>
          {{ pageNumber }}
        </p>
      </div>
      <div class="pagination__actions-next-page">
        <button
          @click="nextPage"
          v-show="(pageNumber * pageSize) / arrIssue.length < 1"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
  props: {
    arrIssue: Array,
    pageNumber: Number,
    pageSize: Number,
    nextPage: Function,
    previusPage: Function,
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxPaginationTable.scss";
</style>
