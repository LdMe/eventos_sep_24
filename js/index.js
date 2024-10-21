import { getEventTypes, getEventsByProvince, getEventsByType, getProvinces, getEvents } from "./api.js";
import Event from "./event.js";

let eventTypeId = '0';
let provinceId = '0';

const searchSection = document.getElementById("search");

function createSearchButton() {
    const button = document.createElement("button");
    button.innerText = "buscar";
    button.addEventListener("click", async () => {
        createEventCards();
    })
    searchSection.appendChild(button)
}
async function createEventTypeSelector() {
    const selector = document.createElement("select");
    searchSection.appendChild(selector);
    const allOption = document.createElement("option");
    allOption.value = '0';
    allOption.innerText = "Todos los tipos";
    selector.appendChild(allOption);
    const eventTypes = await getEventTypes();
    for (const eventType of eventTypes) {
        const option = document.createElement("option");
        option.value = eventType.id;
        option.innerText = eventType.nameEs;
        selector.appendChild(option);
    }
    selector.addEventListener("change", async (e) => {
        eventTypeId = e.target.value;
        /* const events = await getEvents({type:eventTypeId,provinceNoraCode:provinceId});
        console.log(events); */

    })
    return selector;
}

async function createProvinceSelector() {
    const selector = document.createElement("select");
    searchSection.appendChild(selector);
    const allOption = document.createElement("option");
    allOption.innerText = "Todas las provincias";
    allOption.value = '0';
    selector.appendChild(allOption);
    const provinces = await getProvinces();
    for (const province of provinces.items) {
        const option = document.createElement("option");
        option.value = province.provinceId;
        option.innerText = province.nameEs;
        selector.appendChild(option);
    }
    selector.addEventListener("change", async (e) => {
        provinceId = e.target.value;
    })
    return selector;
}

async function createEventCards() {
    const eventSection = document.getElementById("events")
    eventSection.innerHTML = "cargando...";
    const events = await getEvents({ type: eventTypeId, provinceNoraCode: provinceId });
    eventSection.innerHTML = "";

    for (const event of events.items) {
        console.log(event);
        const image = event.images.length ? event.images[0].imageUrl : null
        const newEvent = new Event(event.id, event.nameEs, event.descriptionEs, event.priceEs, image)
        eventSection.appendChild(newEvent.render());
    }
}
/* async function createSearchForm(){

} */
createEventTypeSelector()
createProvinceSelector();
createSearchButton();
//createEventCards();