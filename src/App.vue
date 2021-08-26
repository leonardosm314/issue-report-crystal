<template>
  <!-- <div id="nav" class="wrapper">
    <router-link to="/">
      Home
    </router-link>
  </div> -->
  <router-view />
</template>

<script>
import { ref, provide } from "vue";

export default {
  setup() {
    const token = ref("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");
    const storeReportApp = ref({
      owner: "LuisDev2001",
      repo: "report-issues-github",
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
