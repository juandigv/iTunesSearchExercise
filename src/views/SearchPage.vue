<template>
  <div class="searchList">
    <h1> iTunes Search & Selector </h1>
    <input v-model="searchField" placeholder="Search"/>
    <select v-model="searchSelect">
      <option v-for="type in this.searchType" :key="type.value" :value="type.value"> {{type.text}} </option>
    </select>
    <button v-on:click="getSearchResult">
      Search
    </button>
  </div>  
</template>

<script>
export default {
  name: 'SearchPage',
  data(){
    return{
      searchField: "",
      searchSelect: "all",
      searchType:[
        {text:"All",value:"all"},
        {text:"Movie",value:"movie"},
        {text:"Podcast",value:"podcast"},
        {text:"Music",value:"musictrack"},
        {text:"Music Video",value:"musicvideo"},
        {text:"Audio Book",value:"audiobook"},
        {text:"Shortfilm",value:"shortfilm"},
        {text:"TV Show",value:"tvshow"},
        {text:"Software",value:"software"},
        {text:"E-Book",value:"ebook"},
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
    getSearchResult(){
      console.log("Searching for "+ this.searchField +" in "+ this.searchSelect);
      this.generatedURL = "https://itunes.apple.com/search?term="+this.searchField;
      if(this.searchSelect != "all"){
        this.generatedURL+="&media="+this.searchSelect;
      }
      console.log("URL: "+this.generatedURL);
    }
  }
}
</script>
