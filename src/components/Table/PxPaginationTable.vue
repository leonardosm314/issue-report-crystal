<template>
  <div class="pagination">
    <div class="pagination__actions">
      <div class="pagination__actions-previus-page">
        <button @click="previusPage">
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>
      <div class="pagination__actions-next-page">
        <button @click="nextPage">
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faChevronRight, faChevronLeft);
//Utils
import { queryApi } from "@/utils/getData";
import { hexToRgb } from "@/utils/getHexToRGB";
export default {
  name: "PxPaginationTable",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = inject("storeReportApp");

    const objInformationIssues = ref({
      idIssue: 0,
      numIssue: "",
      titleIssue: "",
      labels: [],
      asigned: "",
      stateIssue: "",
      updated: "",
    });

    const labelsIssue = ref({
      idLabe: 0,
      color: "",
      name: "",
    });

    let { api_host, owner, repo, options } = store.value;

    let pageNumber = ref(1);
    let pageSize = ref(20);
    let pageCont = Math.ceil(store.value.issuesArr.length / pageSize);

    const getIssues = async () => {
      try {
        const API_URL = `${api_host}/repos/${owner}/${repo}/issues`;
        const params = [
          "state=all",
          "sort=created",
          "direction=asc",
          "per_page=100",
        ];
        const issues = await queryApi(API_URL, params, options);
        issues.forEach((issue) => {
          //Set value that i needed
          objInformationIssues.value = {
            idIssue: issue.id,
            numIssue: issue.number,
            titleIssue: issue.title,
            labels: [],
            asignedUserName:
              issue.assignee !== null ? issue.assignee.login : "",
            asignedUserAvatar:
              issue.assignee !== null ? issue.assignee.avatar_url : "",
            stateIssue: issue.state,
            updated: `${issue.updated_at.split("T")[0]}`,
          };
          // - ${issue.updated_at.split("T")[1].replace("Z", "")}
          //get labels
          issue.labels.forEach((label) => {
            labelsIssue.value = {
              idLabe: label.id,
              color: `${hexToRgb(label.color).r}, ${hexToRgb(label.color).g}, ${
                hexToRgb(label.color).b
              }`,
              name: label.name,
            };
            objInformationIssues.value.labels = [
              ...objInformationIssues.value.labels,
              labelsIssue.value,
            ];
          });

          //Concat information
          store.value.issuesArr = [
            ...store.value.issuesArr,
            objInformationIssues.value,
          ];
        });
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    const paginate = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };

    const nextPage = async () => {
      pageNumber.value++;
      await showIssues();
    };

    const previusPage = async () => {
      pageNumber.value--;
      await showIssues();
    };

    onMounted(async () => {
      await showIssues();
    });

    const showIssues = async () => {
      await getIssues();
      store.value.issuesArr = paginate(
        store.value.issuesArr,
        pageSize.value,
        pageNumber.value
      );
    };

    return {
      nextPage,
      previusPage,
      pageCont,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxPaginationTable.scss";
</style>
