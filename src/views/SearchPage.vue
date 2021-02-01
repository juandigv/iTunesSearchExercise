<template>
  <div class="searchList">
    <h1> iTunes Search & Selector </h1>
    <input v-model="searchField" placeholder="Search"/>
    <select v-model="searchSelect">
      <option :key="type" v-for="type in this.searchType"> {{type}} </option>
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
      searchSelect: "All",
      searchType:["All","Podcast","Music","AudioBook"],
      searchResult: "DEFAULT"
    }
  },
  methods: {
    getSearchResult(){
      //
    }
  }
}
</script>
