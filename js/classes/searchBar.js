import { getEventTypes,getProvinces } from "../api.js";
class SearchBar{
    constructor(sectionId = "search"){
        
        this.searchSection = document.getElementById(sectionId);
        this.eventTypeId = 0;
        this.provinceId = 0;
        this.createSearchButton();
        this.createEventTypeSelector();
        this.createProvinceSelector();
        
    }
    createSearchButton() {
        const button = document.createElement("button");
        button.innerText = "buscar";
        button.addEventListener("click", async () => {
            createEventCards();
        })
        this.searchSection.appendChild(button)
    }
    createSelector(title) {
        const selector = document.createElement("select");
        this.searchSection.appendChild(selector);
        const allOption = document.createElement("option");
        selector.
        allOption.innerText = "Todos";
        allOption.value = '0';
        selector.appendChild(allOption);
        return selector;
    }
    addSelectorOptions(selector, options) {
        for (const option of options) {
            const optionElement = document.createElement("option");
            optionElement.value = option.value
            optionElement.innerText = option.title;
            selector.appendChild(optionElement);
        }
        return selector
    }
    async createEventTypeSelector() {
        const selector = this.createSelector();
        const eventTypes = await getEventTypes();
        const data = eventTypes.map(item => { return { value: item.id, title: item.nameEs } })
        this.addSelectorOptions(selector, data);
        selector.addEventListener("change", async (e) => {
            this.eventTypeId = e.target.value;
        })
        return selector;
    }
    async createProvinceSelector() {
        const selector = this.createSelector();
        const provinces = await getProvinces();
        const data = provinces.items.map(item => { return { value: item.provinceId, title: item.nameEs } })
        this.addSelectorOptions(selector, data);
        selector.addEventListener("change", async (e) => {
            this.provinceId = e.target.value;
        })
        return selector;
    }
}

export default SearchBar;