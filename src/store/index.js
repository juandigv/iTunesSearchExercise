import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResults: []
  },
  mutations: {
    addMedia(state, mediaToAdd) {
      state.searchResults.push(mediaToAdd);
    },
    clearSearchResults(state) {
      state.searchResults.length = 0;
    }
  },
  actions: {
    addMedia({ commit }, mediaToAdd) {
      commit("addMedia", mediaToAdd);
    },
    clearSearchResults({ commit }) {
      commit("clearSearchResults");
    }
  },
  getters: {
    getSearchResults(state){
      return state.searchResults;
    }
  },
  modules: {}
});
