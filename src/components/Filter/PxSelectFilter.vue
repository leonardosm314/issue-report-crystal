<template>
  <div class="filter-select">
    <span>{{ nameInput }}</span>
    <div
      :class="{
        select: true,
        isActive: openSelect,
      }"
    >
      <div class="select__option" @click="handleOpenSelct">
        {{ selectedOptionUI }}
        <font-awesome-icon icon="chevron-down" />
      </div>
      <div class="select__options-container">
        <div
          class="select__option"
          v-for="(option, index) in arrayOptions"
          :key="index"
          :data-value="option"
          @click="handleSelectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
    <!-- <select
      name="optionsFilterBy"
      @change="$emit('update:optionsFilterBy', $event.target.value)"
    >
      <option
        v-for="(option, index) in arrayOptions"
        :key="index"
        :value="option"
        :selected="optionsFilterBy === option"
      >
        {{ option }}
      </option>
    </select> -->
  </div>
</template>

<script>
//Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "@vue/reactivity";
library.add(faChevronDown);

export default {
  name: "PxSelectFilter",
  props: {
    nameInput: {
      type: String,
      default: "",
    },
    optionsFilterBy: {
      type: String,
      default: "",
    },
    arrayOptions: {
      type: Array,
      default: [],
    },
  },
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const openSelect = ref(false);
    const selectedOptionUI = ref("---");

    const handleOpenSelct = () => {
      openSelect.value = !openSelect.value;
    };

    const handleSelectOption = (selectedOption) => {
      console.log(selectedOption);
      selectedOptionUI.value = selectedOption;
      openSelect.value = !openSelect.value;
    };

    return {
      openSelect,
      handleOpenSelct,
      handleSelectOption,
      selectedOptionUI,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/components/_PxSelectFilter.scss";
</style>
