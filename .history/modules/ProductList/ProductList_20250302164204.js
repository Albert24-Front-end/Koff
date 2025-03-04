import { addContainer } from "../addContainer";

export class ProductList {
    static instance = null;

    constructor() {
        if(!ProductList.instance) {
            ProductList.instance = this;
            this.element = document.createElement("section");
            this.element.classList.add('goods');
            this.containerElement = addContainer(this.element, 'goods__container')
            this.isMounted = false;

            this.addEvents();
        }
        return ProductList.instance;
    }
    mount(parent, data, title) {
        this.containerElement = '';

        const titleElem = document.createElement("h2");
        titleElem.textContent = title ? title : 'Список товаров';

        titleElem.className = title ? "goods__title" : "goods__title visually-hidden";
        

        if (this.isMounted) {
            return;
        }

        document.body.append(this.element);
        this.isMounted = true;
    }

    unmount() {
        this.element.remove();
        this.isMounted = false;
    }
    appendChild(child) {
        this.element.appendChild(child);
    }
}