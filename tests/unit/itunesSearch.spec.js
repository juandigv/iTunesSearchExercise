import { expect, assert } from "chai";
import {  shallowMount, createLocalVue } from "@vue/test-utils";
import SearchPage from "@/views/SearchPage.vue";
import { mockStore } from "./mockStore";
import Vuex from "vuex";

describe("Itunes Search", () => {
    let localVue;
    let store;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store(mockStore);
    });

    it("Page title should be rendered", () => {
        const expectedTitle = "iTunes Search & Selector";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        const titleInComponent = wrapper.find("#itunesTitle");
        assert.equal(titleInComponent.text(), expectedTitle);
    });

    it("iTunes icon should be rendered", () => {
        const wrapper = shallowMount(SearchPage, { store, localVue });
        const imageInComponent = wrapper.find("#itunesLogo");
        expect(imageInComponent.exists);
    });

    it("By default, searchType must be set in all", () => {
        const expectedType = "all";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        const typeInComponent = wrapper.vm.$data.searchSelect;
        assert.equal(typeInComponent, expectedType);
    });

    it("SearchType list should be at least 3", () => {
        const expectedSize = 3;
        const wrapper = shallowMount(SearchPage, { store, localVue });
        const typeInList = wrapper.vm.searchType.length;
        assert.isAtLeast(typeInList, expectedSize);
    });

    it("By default, Search Input must be empty", () => {
        const wrapper = shallowMount(SearchPage, { store, localVue });
        const inputInComponent = wrapper.vm.$data.searchField;
        assert.isEmpty(inputInComponent);
    });

    it("URL Should be generated correctly, Case all", () => {
        const expectedURL = "https://itunes.apple.com/search?term=coldplay";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.setData({ searchField: "coldplay", searchSelect: "all" });
        wrapper.vm.getQueryURL();
        assert.equal(wrapper.vm.$data.generatedURL, expectedURL);
    });

    it("URL Should be generated correctly, Case Movie", () => {
        const expectedURL = "https://itunes.apple.com/search?term=avenger&entity=movie";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.setData({ searchField: "avenger", searchSelect: "movie" });
        wrapper.vm.getQueryURL();
        assert.equal(wrapper.vm.$data.generatedURL, expectedURL);
    });
    it("URL Should be generated correctly, Case Podcast", () => {
        const expectedURL = "https://itunes.apple.com/search?term=misfits&entity=podcast";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.setData({ searchField: "misfits", searchSelect: "podcast" });
        wrapper.vm.getQueryURL();
        assert.equal(wrapper.vm.$data.generatedURL, expectedURL);
    });
    it("URL Should be generated correctly, Case Album", () => {
        const expectedURL = "https://itunes.apple.com/search?term=coldplay&entity=album";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.setData({ searchField: "coldplay", searchSelect: "album" });
        wrapper.vm.getQueryURL();
        assert.equal(wrapper.vm.$data.generatedURL, expectedURL);
    });
    it("URL Should be generated correctly, Case Song", () => {
        const expectedURL = "https://itunes.apple.com/search?term=coldplay&entity=song";
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.setData({ searchField: "coldplay", searchSelect: "song" });
        wrapper.vm.getQueryURL();
        assert.equal(wrapper.vm.$data.generatedURL, expectedURL);
    });

    it("A server search must fill local search results", () => {
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.vm.saveSearchResult(wrapper.vm.$store.state.searchTestAlbum);
        assert.isAbove(wrapper.vm.$store.state.searchResults.length, 0);
    });

    it("Elements must be rendered when there are searchResults", () => {
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.vm.saveSearchResult(wrapper.vm.$store.state.searchTestAlbum);
        const mediaComponent = wrapper.find("#media");
        expect(mediaComponent.exists);
    });
    it("A element must display its type", () => {
        const wrapper = shallowMount(SearchPage, { store, localVue });
        wrapper.vm.saveSearchResult(wrapper.vm.$store.state.searchTestExplicit);
        const typeComponent = wrapper.find('#typeLabel');
        assert.equal(typeComponent.text(), "Album")
    });
});
