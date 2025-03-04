import "normalize.css";
import "./style.scss";
import Navigo from 'navigo';
import { Header } from '../modules/Header/header';
import { Main } from '../modules/Main/MAin';
import { Footer } from '../modules/Footer/Footer';
import { Order } from '../modules/Order/Order';
import { ProductList } from "../modules/ProductList/ProductList";

// Динамический импорт модулей: вызов productSlider() - асинхронный импорт модулей библиотеки Swiper через промисы 
// - получение результата вызова промисов в виде массива деструктирированных модулей и объекта самой библиотеки
// Почему это делается динамически?
// Такой способ помогает:

// Сократить начальный размер JS-файла, загружая Swiper только при необходимости.
// Избежать ошибок в случае, если Swiper не нужен на некоторых страницах.
const productSlider =()=> {
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css'),
  ]).then(([{Navigation, Thumbs}, Swiper])=>{
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    new Swiper.default(".product__slider-main", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  })
}

const init =()=>{
  new Header().mount();
  new Main().mount();
  new Footer().mount();
  // new Order().mount(new Main().element);

  productSlider();

  const router = new Navigo("/", {linksSelector: 'a[href^="/"]'});

  

  router
      .on("/", ()=>{
        new ProductList().mount(new Main().element, [1,2,3]);
      }, {
        leave(done) {
          console.log('leave');
          done();
        },
        already() {
          console.log('already');
        },
      },
    )
      .on("/category", 
        () => { 
          console.log(1);
          new ProductList().mount(new Main().element, [1,2,3], "Категория");
      }, {
        leave(done) {
          console.log('leave');
          done();
        },
      })
      .on("/favourite", 
        () => { new ProductList().mount(new Main().element, [1,2,3,4,5,6], "Избранное");
      }, {
        leave(done) {
          console.log('leave');
          done();
        },
      })
      .on("/search", ()=>{
        console.log("search");
      })
      .on("/product/:id", (obj)=>{
        console.log("obj:", obj);
      })
      .on("/cart", ()=>{
        console.log("cart");
      })
      .on("/order", ()=>{
        console.log("order");
      })
      .notFound(()=>{
        console.log("404");
        new Main.innerHTML = `
        <h2>Страница не найдена</h2>
        <p>Подождите, мы направим Вас <a href="/">на главную страницу</a></p>
      `;
      setTimeout(()=>{
        router.navigate("/")
      }, 5000);
      },
      {
        leave(done) {
          console.log('leave');
          done();
        },
      }
    )

      router.resolve();
};

init();