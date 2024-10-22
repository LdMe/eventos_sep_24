import { getEvents } from "../api.js";
import Event from "./event.js";

export async  function createEventCards(eventTypeId,provinceId,page) {
    
    const eventSection = document.getElementById("events")
    if(page ===1){
        eventSection.innerHTML = "cargando...";
    }
    const events = await getEvents({ type: eventTypeId, provinceNoraCode: provinceId,_page:page});
    if(page === 1){
        eventSection.innerHTML = "";
    }
    if(!events.items){
        return;
    }
    for (const event of events.items) {
        console.log(event);
        const image = event.images.length ? event.images[0].imageUrl : null
        const newEvent = new Event(event.id, event.nameEs, event.descriptionEs, event.priceEs, image)
        eventSection.appendChild(newEvent.render());
    }
}

