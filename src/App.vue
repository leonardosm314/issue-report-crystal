<template>
  <router-view />
</template>

<script>
import { ref, provide } from "vue";

export default {
  setup() {
    const token = ref("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");
    const storeReportApp = ref({
      owner: "avatar-global",
      repo: "crystal-wsc91-2021-issues",
      api_host: "https://api.github.com",
      options: {
        method: "get",
        headers: {
          authorization: `Bearer ${token.value}`,
          accept:
            "application/vnd.github.inertia-preview+json, vnd.github.v3+json",
        },
        muteHttpExceptions: true,
      },
      issuesArr: [],
      pageNumber: 1,
      pageSize: 20,
    });

    provide("storeReportApp", storeReportApp);

    return {
      storeReportApp,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/sass/_base.scss";
@import "~@/assets/sass/App.scss";
</style>
