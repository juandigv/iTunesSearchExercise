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
                <div class="cardTemplate">
                    <h2> {{media.type}}</h2>
                    <img :src="media.artwork" onerror="this.src='https://apprecs.org/ios/images/app-icons/256/3d/1090617661.jpg'" />
                    <div class="textContent">
                        <h2>{{ media.name }}</h2>
                        <h2 v-if="media.type != 'collection' || media.type != 'audiobook'">{{ media.collectionName}}</h2>
                        <h4>{{ media.artist }}</h4>
                        <h4 v-if="media.trackCount >1">{{ media.trackCount }} Tracks</h4>
                        <h4>${{ media.price }}</h4>
                    </div>
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
            searchType: [
                { text: "All", value: "all" },
                { text: "Movie", value: "movie" },
                { text: "Podcast", value: "podcast" },
                { text: "Music", value: "album" },
                { text: "Music Video", value: "musicVideo" },
                { text: "Audio Book", value: "audiobook" },
            ],
            template: {
                id: "",
                kind: "",
                artwork: "",
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
                    this.saveSearchResult(dataResults);
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
                if (data.results[i].wrapperType == "collection") {
                    this.addMedia({
                        id: data.results[i].collectionId,
                        type: data.results[i].collectionType,
                        artwork: data.results[i].artworkUrl100,
                        name: data.results[i].collectionName,
                        artist: data.results[i].artistName,
                        price: data.results[i].collectionPrice,
                        trackCount: data.results[i].trackCount
                    });
                } else if (data.results[i].wrapperType == "audiobook") {
                    this.addMedia({
                        id: data.results[i].collectionId,
                        type: data.results[i].wrapperType,
                        artwork: data.results[i].artworkUrl100,
                        name: data.results[i].collectionName,
                        artist: data.results[i].artistName,
                        price: data.results[i].collectionPrice,
                        trackCount: data.results[i].trackCount
                    });
                } else {

                    this.addMedia({
                        id: data.results[i].trackId,
                        type: data.results[i].kind,
                        artwork: data.results[i].artworkUrl100,
                        name: data.results[i].trackName,
                        collectionName: data.results[i].collectionName,
                        artist: data.results[i].artistName,
                        price: data.results[i].collectionPrice,
                        trackCount: data.results[i].trackCount
                    });

                }
            }
        },
    },
    computed: {
        ...mapGetters(["getSearchResults"]),
        searchResults() {
            return this.getSearchResults;
        },
    },
};
</script>

