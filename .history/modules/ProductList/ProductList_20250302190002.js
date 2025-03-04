import { addContainer } from "../addContainer";

export class ProductList {
    static instance = null;

    constructor() {
        if(!ProductList.instance) {
            ProductList.instance = this;
            this.element = document.createElement("section");
            this.element.classList.add("goods");
            this.containerElement = addContainer(this.element, "goods__container")
            this.isMounted = false;

            this.addEvents();
        }
        return ProductList.instance;
    }

    mount(parent, data, title) {
        this.containerElement.textContent = "";

        const titleElem = document.createElement("h2");
        titleElem.textContent = title ? title : "Список товаров";

        titleElem.className = title 
        ? "goods__title" 
        : "goods__title visually-hidden";

        this.containerElement.append
        this.updateListElem(data);

        if (this.isMounted) {
            return;
        }

        parent.body.append(this.element);
        this.isMounted = true;
    }

    unmount() {
        this.element.remove();
        this.isMounted = false;
    }
    addEvents() {

    };
    updateListElem(data = []) {
        const listElem = document.createElement("ul");
        listElem.classList.add("goods__list");

        const listItems = data.map((item)=>{
            const listItemElem = document.createElement("li");
            // listItemElem.classList.add("goods__item");
            listItemElem.textContent = item;

            return listItemElem;
        })
        listElem.append(...listItems);
        this.containerElement.append(listElem);
    };
}