<template>
  <PxButton
    className="actions__menu"
    :isActive="true"
    classNameButton="btn btn-gen-menu"
    @click="handleOpenMenu"
  >
    <font-awesome-icon icon="bars" />
  </PxButton>

  <PxButton
    className="actions__report"
    classNameButton="btn btn-gen-report"
    :isActive="menuIsOpen"
    @click="handleExportXLSX"
  >
    <font-awesome-icon icon="file-excel" />
  </PxButton>
  <PxButton
    className="actions__refresh-table"
    classNameButton="btn btn-refresh-table"
    :isActive="menuIsOpen"
    @click="handleUpdateIssues"
  >
    <font-awesome-icon icon="sync" />
  </PxButton>
</template>

<script>
import { inject, ref } from "vue";
import XLSX from "xlsx";
//UI
import PxButton from "@/components/PxButton";
//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faFileExcel, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faFileExcel, faSync, faBars);

export default {
  name: "PxMenuUI",
  components: {
    PxButton,
    FontAwesomeIcon,
  },
  setup() {
    const store = inject("storeReportApp");

    const menuIsOpen = ref(false);

    const handleExportXLSX = () => {
      let data = XLSX.utils.json_to_sheet(store.value.issuesArr);
      const workbook = XLSX.utils.book_new();
      const filename = "crystal-issues";
      const date = new Date();
      const fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}-${fullDate}.xlsx`);
    };

    const handleUpdateIssues = async () => {
      store.value.load = true;

      const index = store.value.issuesArr.findIndex(
        (item) => item.id_issue == item.id_issue
      );

      store.value.issuesArr = [
        ...store.value.issuesArr.slice(0, index),
        ...store.value.issuesArr.slice(index),
      ];

      setTimeout(() => {
        store.value.load = false;
      }, 1000);
    };

    const handleOpenMenu = () => {
      menuIsOpen.value = !menuIsOpen.value;
    };

    return {
      handleExportXLSX,
      handleUpdateIssues,
      handleOpenMenu,
      menuIsOpen,
    };
  },
};
</script>

<style lang="scss" scoped></style>
