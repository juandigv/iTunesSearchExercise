<template>
    <div class="searchList">
        <h1> iTunes Search & Selector </h1>
        <input v-model="searchField" placeholder="Search" />
        <select v-model="searchSelect">
                                          <option v-for="type in this.searchType" :key="type.value" :value="type.value"> {{type.text}} </option>
                                        </select>
        <button v-on:click="getSearchResult">
                                          Search
                                        </button>
    </div>
</template>

<script>
import jquery from "jquery";
export default {
    name: 'SearchPage',
    data() {
        return {
            searchField: "",
            searchSelect: "all",
            searchType: [
                { text: "All", value: "all" },
                { text: "Podcast", value: "podcast" },
                { text: "Music", value: "musicote" },
                { text: "Music Video", value: "musicVideo" },
                { text: "Audio Book", value: "audiobook" }
            ],
            searchResult: [],
            template: {
                imageCover: "",
                name: "",
                artist: "",
                price: "",
            },
            generatedURL: ""
        }
    },
    methods: {
        async getSearchResult() {
            jquery.getJSON(this.getQueryURL(), function(data) {
                for (var i = 0; i < data.resultCount; i++) {
                    console.log("Data: " + i + " Name: " + data.results[i].trackName + " Artist: " + data.results[i].artistName);
                }
            }).fail(function() {
                console.log("An error occurred, could not reach host ");
            });
        },
        getQueryURL() {
            this.generatedURL = "https://itunes.apple.com/search?term=" + this.searchField;
            if (this.searchSelect != "all") {
                this.generatedURL += "&media=" + this.searchSelect;
            }
            console.log("URL: " + this.generatedURL);
            return this.generatedURL;
        }
    }
}
</script>
