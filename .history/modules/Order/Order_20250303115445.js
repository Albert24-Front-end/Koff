import { addContainer } from "../addContainer";
import { Main } from "../Main/MAin";

export class Order {
    static instance = null;

    constructor() {
        if(!Order.instance) {
            Order.instance = this;
            this.element = document.createElement("section");
            this.element.classList.add("order");
            this.containerElement = addContainer(this.element, "order__container");
            this.isMounted = false;
        }
        return Order.instance;
    }
    mount() {
        if (this.isMounted) {
            return;
        }

        this.containerElement.insertAdjacentHTML('beforeend', this.getHTML());

        const main = new Main();
        main.mount();
        main.appendChild(this.element);
        this.isMounted = true;
    }

    unmount() {
        this.element.remove();
        this.isMounted = false;
    }

    getHTML() {
        return `
            <div class="order__title">
                <div class="order__title-message">Заказ успешно размещен</div>
                <div class="order__title-price">20&nbsp;000&nbsp;₽</div>
            </div>
            <p class="order__number">№43435</p>
            <div class="order__features">
                <h3 class="order__features-title">Данные доставки</h3>
                <table class="order__features-table table">
                    <tr class="table__row">
                    <td class="table__field">Получатель</td>
                    <td class="table__value">Иванов Петр Александрович</td>
                    </tr>
                    <tr class="table__row">
                    <td class="table__field">Телефон</td>
                    <td class="table__value">+7 (737) 346 23 00</td>
                    </tr>
                    <tr class="table__row">
                    <td class="table__field">E-mail</td>
                    <td class="table__value">Ivanov84@gmail.com</td>
                    </tr>
                    <tr class="table__row">
                    <td class="table__field">Адрес доставки</td>
                    <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
                    </tr>
                    <tr class="table__row">
                    <td class="table__field">Способ оплаты</td>
                    <td class="table__value">Картой при получении</td>
                    </tr>
                    <tr class="table__row">
                    <td class="table__field">Способ получения</td>
                    <td class="table__value">Доставка</td>
                    </tr>
                </table>
                <button class="order__btn" type="button">На главную</button>
            </div>
        `;
    }
}