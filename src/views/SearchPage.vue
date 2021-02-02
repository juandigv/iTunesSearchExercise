<template>
    <div class="searchPage">
        <div class="searchBar">
            <h1>iTunes Search & Selector</h1>
            <input v-model="searchField" placeholder="Search" />
            <select v-model="searchSelect">
                                  <option
                                    v-for="type in this.searchType"
                                    :key="type.value"
                                    :value="type.value"
                                  >
                                    {{ type.text }}
                                  </option>
                                </select>
            <button v-on:click="getSearchResult">Search</button>
        </div>
        <div class="searchList">
            <div class="media" v-for="media in searchResults" :key="media.id">
                <h4>{{media.id}} , {{media.kind}}, {{media.type}} ,{{media.name}}, {{media.artist}}</h4>
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
            searchType: [
                { text: "All", value: "all" },
                { text: "Movie", value: "movie" },
                { text: "Podcast", value: "podcast" },
                { text: "Music", value: "song" },
                { text: "Music Video", value: "musicVideo" },
                { text: "Audio Book", value: "audiobook" },
            ],
            template: {
                id: "",
                kind: "",
                imageCover: "",
                name: "",
                artist: "",
                price: "",
            },
            generatedURL: "",
        };
    },
    methods: {
        ...mapActions(["addMedia", "clearSearchResults"]),
        getSearchResult() {
            this.clearSearchResults();
            var dataResults;
            jquery
                .getJSON(this.getQueryURL(), function(data) {
                    dataResults = data;
                })
                .done(() => {
                    this.saveSearchResult(dataResults)
                })
                .fail(function() {
                    console.log("An error occurred, could not reach host ");
                });
        },
        getQueryURL() {
            this.generatedURL =
                "https://itunes.apple.com/search?term=" + this.searchField;
            if (this.searchSelect != "all") {
                this.generatedURL += "&entity=" + this.searchSelect;
            }
            console.log("URL: " + this.generatedURL);
            return this.generatedURL;
        },
        saveSearchResult(data) {
            for (var i = 0; i < data.resultCount; i++) {
                this.addMedia({
                    id: data.results[i].trackId,
                    kind: data.results[i].kind,
                    type: data.results[i].wrapperType,
                    imageCover: data.results[i].artworkUrl100,
                    name: data.results[i].trackName,
                    artist: data.results[i].artistName,
                });
            }
        }
    },
    computed: {
        ...mapGetters(["getSearchResults"]),
        searchResults() {
            return this.getSearchResults;
        },
    },
};
</script>
