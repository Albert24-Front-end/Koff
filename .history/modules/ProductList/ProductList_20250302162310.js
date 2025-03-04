import { addContainer } from "../addContainer";

export class ProductList {
    static instance = null;

    constructor() {
        if(!ProductList.instance) {
            ProductList.instance = this;
            this.element = document.createElement("section");
            this.element.classList.add('goods');
            this.containerElement = addContainer(this.containerElement)
            this.isMounted = false;
        }
        return ProductList.instance;
    }
    mount() {
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