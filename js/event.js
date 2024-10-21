class Event {
    constructor(id, name, description, price = null, image = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price ? price : "gratis";
        this.image = image || "https://placehold.co/600x400/EEE/31343C";
    }
    render(){
        const article = document.createElement("article");
        const title = document.createElement("h2");
        const description = document.createElement("section");
        const price = document.createElement("p");
        const image = document.createElement("img");

        article.classList.add("event-card");
        title.innerText = this.name;
        description.innerHTML = this.description;
        price.innerText = this.price ;
        image.src = this.image;
        image.alt = this.name;
        article.append(image,title,price,description);
        return article;
    }
}

export default Event;