<template>
  <div class="home wrapper">
    <h1>
      Crystal Report
    </h1>

    <div class="table">
      <PxHeaderTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
      <PxBodyTable />
    </div>
  </div>
</template>

<script>
import PxHeaderTable from "@/components/PxHeaderTable";
import PxBodyTable from "@/components/PxBodyTable";

export default {
  name: "Home",
  components: {
    PxHeaderTable,
    PxBodyTable,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/views/Home.scss";
</style>
