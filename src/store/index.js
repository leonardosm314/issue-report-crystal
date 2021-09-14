import { createStore } from "vuex";

const state = {
  loaderStateUI: false,
  arrayIssuesUI: [],
  arrayIssuesXlxs: [],
};

const mutations = {
  //Mutation for state show loader
  setShowLoaderUIState(state) {
    state.loaderStateUI = true;
  },
  //Mutation for state hide loader
  setHideLoaderUIState(state) {
    state.loaderStateUI = false;
  },
  //Mutation for set issues to array
  setArrayIssuesUI(state, informationIssues) {
    state.arrayIssuesUI.push(informationIssues);
    //Order array objects issues
    state.arrayIssuesUI.sort((a, b) => {
      if (a.num_issue < b.num_issue) {
        return -1;
      }
      if (a.num_issue > b.num_issue) {
        return 1;
      }
      return 0;
    });
  },
  setArrayIssuesXlxs(state, informationIssues) {
    state.arrayIssuesXlxs.push(informationIssues);
    state.arrayIssuesXlxs.sort((a, b) => {
      if (a.num_issue < b.num_issue) {
        return -1;
      }
      if (a.num_issue > b.num_issue) {
        return 1;
      }
      return 0;
    });
  },
};

const actions = {
  //Action to show loader
  setShowLoaderUIState: ({ commit }) => commit("setShowLoaderUIState"),
  //Action to hide loader
  setHideLoaderUIState: ({ commit }) => commit("setHideLoaderUIState"),
  //Action to set Array issues
  setArrayIssuesUI: ({ commit }) => commit("setArrayIssuesUI"),
  setArrayIssuesXlxs: ({ commit }) => commit("setArrayIssuesXlxs"),
};

const getters = {
  getArrayXlxs(state) {
    return state.arrayIssuesXlxs;
  },
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
