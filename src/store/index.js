import { createStore } from "vuex";

const state = {
  loaderStateUI: false,
};

const mutations = {
  setShowLoaderUIState(state) {
    state.loaderStateUI = true;
  },
  setHideLoaderUIState(state) {
    state.loaderStateUI = false;
  },
};

const actions = {
  setShowLoaderUIState: ({ commit }) => commit("setShowLoaderUIState"),
  setHideLoaderUIState: ({ commit }) => commit("setHideLoaderUIState"),
};

const getters = {};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
