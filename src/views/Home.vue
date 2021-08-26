<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <PxTableUI>
      <PxHeaderTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
    </PxTableUI>

    <PxButton />
  </div>
</template>

<script>
import PxTableUI from "@/components/PxTableUI";
import PxHeaderTable from "@/components/PxHeaderTable";
import PxBodyTable from "@/components/PxBodyTable";
import PxButton from "@/components/PxButton";

import { queryApi } from "@/utils/getData";

export default {
  name: "Home",
  components: {
    PxTableUI,
    PxHeaderTable,
    PxBodyTable,
    PxButton,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
