import { apiKey,appId } from "./apiKey.js";

const BASE_URL = "https://api.euskadi.eus/culture/events/v1.0/";



async function fetchData(route, searchParams = {}) {
    try {
        const url = new URL(BASE_URL + route);
        for (const key of Object.keys(searchParams)) {
            url.searchParams.append(key, searchParams[key]);
        }
        const response = await fetch(url.toString());
        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error(error);
        return { error: error }
    }
}

async function getEventTypes() {
    const eventTypes = await fetchData("eventType");
    return eventTypes;
}

async function getProvinces() {
    const provinces = await fetchData("provinces");
    return provinces;
}

async function getEventsByType(type) {
    if (type === '0') {
        const events = await fetchData("events")
        return events;
    }
    const events = await fetchData("events", { type: type })
    return events;
}

async function getEventsByProvince(provinceId){
    if(provinceId === '0'){
        const events = await fetchData("events")
        return events;
    }
    const events = await fetchData("events",{provinceNoraCode:provinceId})
    return events;
}

function removeEmptyFilter(filter){
    const newFilter = {};
    for(const [key,value] of Object.entries(filter)){
       if(value !== '0'){
        newFilter[key] = value;
       }
    }
    return newFilter
}

async function getEvents(filter){
    const newFilter = removeEmptyFilter(filter)
    const events = await fetchData("events",newFilter);
    return events;
}

export {
    getEventTypes,
    getEventsByType,
    getProvinces,
    getEventsByProvince,
    getEvents
}
