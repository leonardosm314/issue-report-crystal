<template>
  <div class="loader">
    <img src="@/assets/img/loader.svg" alt="LOADER" />
  </div>
</template>

<script>
export default {
  name: "PxLoader",
};
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 0 0;
}
</style>
