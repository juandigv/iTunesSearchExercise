import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResults: [],
    searchType: [
      { text: "All", value: "all" },
      { text: "Movie", value: "movie" },
      { text: "Podcast", value: "podcast" },
      { text: "Music Album", value: "album" },
      { text: "Music", value: "song" },
      { text: "Music Video", value: "musicVideo" },
      { text: "Audio Book", value: "audiobook" }
    ],
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
    getSearchResults(state) {
      return state.searchResults;
    },
    getSearchType(state){
      return state.searchType;
    }
  },
  modules: {}
});
