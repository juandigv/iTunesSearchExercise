<template>
  <div class="searchPage">
    <div class="searchBar">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <img id="itunesLogo" class="logo" src="../assets/ituneslogo.png" />
      <h1 id="itunesTitle" class="title">iTunes Search & Selector</h1>
      <input id="searchInput" v-model="searchField" placeholder="Search" />
      <select id="searchSelectable" v-model="searchSelect">
        <option
          v-for="type in searchType"
          :key="type.value"
          :value="type.value"
        >
          {{ type.text }}
        </option>
      </select>
      <button
        id="searchButton"
        class="searchButton"
        v-on:click="getSearchResult"
      >
        <i class="large material-icons">search</i>
      </button>
    </div>
    <div class="searchList">
      <div
        id="media"
        class="media"
        v-for="media in searchResults"
        :key="media.id"
      >
        <div class="cardTemplate">
          <center>
            <h4 id="typeLabel" class="type">{{ media.type }}</h4>
          </center>
          <img
            id="artworkField"
            class="mediaArtwork"
            :src="media.artwork"
            onerror="this.src='https://apprecs.org/ios/images/app-icons/256/3d/1090617661.jpg'"
          />
          <div class="textContent">
            <h2 id="nameLabel">{{ media.name }}</h2>
            <h4
              v-if="
                !(
                  media.type === 'collection' ||
                  media.type === 'audiobook' ||
                  media.type === 'podcast'
                )
              "
            >
              {{ media.collectionName }}
            </h4>
            <br />
            <h4 id="artistLabel">{{ media.artist }}</h4>
            <h4 v-if="media.price === 0">FREE</h4>
            <h4 v-else>${{ media.price }}</h4>
          </div>
          <center>
            <h4 id="explicitLabel" v-if="media.explicit === 'explicit'" class="explicitLabel">
              <i class="large material-icons">explicit</i>
            </h4>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jquery from "jquery";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchPage",
  data() {
    return {
      searchField: "",
      searchSelect: "all",
      generatedURL: "",
    };
  },
  methods: {
    ...mapActions(["addMedia", "clearSearchResults"]),
    getSearchResult() {
      var dataResults;
      jquery
        .getJSON(this.getQueryURL(), function (data) {
          dataResults = data;
        })
        .done(() => {
          this.saveSearchResult(dataResults);
        })
        .fail(function () {
          console.log("An error occurred, could not reach host ");
        });
    },
    getQueryURL() {
      this.generatedURL =
        "https://itunes.apple.com/search?term=" + this.searchField;
      if (this.searchSelect != "all") {
        this.generatedURL += "&entity=" + this.searchSelect;
      }
      return this.generatedURL;
    },
    saveSearchResult(data) {
      this.clearSearchResults();
      for (var i = 0; i < data.resultCount; i++) {
        if (data.results[i].wrapperType == "collection") {
          this.addMedia({
            id: data.results[i].collectionId,
            type: data.results[i].collectionType,
            artwork: data.results[i].artworkUrl100.replace(
              "100x100bb.jpg",
              "600x600bb.jpg"
            ),
            name: data.results[i].collectionName,
            artist: data.results[i].artistName,
            price: data.results[i].collectionPrice,
            explicit: data.results[i].collectionExplicitness,
          });
        } else if (data.results[i].wrapperType == "audiobook") {
          this.addMedia({
            id: data.results[i].collectionId,
            type: data.results[i].wrapperType,
            artwork: data.results[i].artworkUrl100.replace(
              "100x100bb.jpg",
              "600x600bb.jpg"
            ),
            name: data.results[i].collectionName,
            artist: data.results[i].artistName,
            price: data.results[i].collectionPrice,
            explicit: data.results[i].collectionExplicitness,
          });
        } else {
          this.addMedia({
            id: data.results[i].trackId,
            type: data.results[i].kind,
            artwork: data.results[i].artworkUrl100.replace(
              "100x100bb.jpg",
              "600x600bb.jpg"
            ),
            name: data.results[i].trackName,
            collectionName: data.results[i].collectionName,
            artist: data.results[i].artistName,
            price: data.results[i].collectionPrice,
            explicit: data.results[i].trackExplicitness,
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getSearchResults", "getSearchType"]),
    searchResults() {
      return this.getSearchResults;
    },
    searchType() {
      return this.getSearchType;
    },
  },
};
</script>

<style src="../components/style.css" scoped>
</style>