import { getEventTypes, getProvinces, getEvents } from "../api.js";
import { createEventCards } from "./eventCard.js";

class SearchBar {
    constructor(sectionId = "search") {

        this.searchSection = document.getElementById(sectionId);
        this.pageButtonSection = document.getElementById("pageButton")
        this.eventTypeId = '0';
        this.provinceId = '0';
        this.createSearchButton();
        this.createPageButton();
        this.createEventTypeSelector();
        this.createProvinceSelector();
        this.page = 1;
        /* document.addEventListener("scroll", () => {
            console.log("scroll");
            // Obtén la referencia correcta a los elementos
            const scrollPosition = window.innerHeight + this.searchSection.scrollTop;
            const scrollThreshold = searchSection.scrollHeight;
            console.log("scrollPosition",scrollPosition,scrollThreshold)
            // Verifica si se ha llegado al final
            if (Math.ceil(scrollPosition) >= scrollThreshold) {
                console.log("cargando");
                this.page++;
                createEventCards(this.eventTypeId, this.provinceId, this.page);
            }
        }); */


    }
    createSearchButton() {
        const button = document.createElement("button");
        button.innerText = "buscar";
        button.addEventListener("click", () => {
            createEventCards(this.eventTypeId, this.provinceId, this.page);
        })
        this.searchSection.appendChild(button)
    }
    createPageButton() {
        const nextButton = document.createElement("button");
        //const prevButton = document.createElement("button");

        nextButton.innerText = "siguiente";
        nextButton.addEventListener("click", () => {
            this.page++;
            createEventCards(this.eventTypeId, this.provinceId, this.page);
        })
        /* prevButton.innerText = "anterior";
        prevButton.addEventListener("click", () => {
            this.page--;
            createEventCards(this.eventTypeId,this.provinceId,this.page);
        })
        this.pageButtonSection.appendChild(prevButton) */
        this.pageButtonSection.appendChild(nextButton)
    }
    createSelector(title) {
        const selector = document.createElement("select");
        this.searchSection.appendChild(selector);
        const allOption = document.createElement("option");
        //selector.
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
            this.page = 1;
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
            this.page = 1;
        })
        return selector;
    }

}

export default SearchBar;