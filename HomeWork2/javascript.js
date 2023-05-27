'use strict';

const nameKeyLocalStorage = 'active-slide-info';

$(document).ready(function(){
    var owl = $(".owl-carousel"); //инициализировали карусель
    $(".owl-carousel").owlCarousel({
        items: 2, //одновременно отображаемые элементы
        margin: 50, //отступ справа слайда
        loop: true, //зацикливание элементов (бесконечная прокрутка)
        //center: true, //слайды по центру
        //mouseDrag: false, //можно ли драгать мышкой
        //touchDrag: false, //режим эмуляции мобильного устройства
        //pullDrag: true,
        //freeDrag: true //разрешение свободного перемешения слайдов
        // stagePadding: 50, //Для видимости краев других слайдов при прокрутке
        // merge: true, //для  занятия позиции слайда
        // mergeFit: false
        //autoWidth: true, //автоматическая ширина
        //startPosition: 2, //Возможность задать начальный слайд
        //URLhashListener: true //Слушать хэш страницы
        //nav: true, //показывать или скрывать стрелки справа
        //rewind: false //размешить или запретить перемотку
        //navText: ['Prev','Next'],//вместо стандартных значков что-то другое 
        //navElement: 'span'
        //slideBy: 3
        //slideTransition: 'ease-in-out' //анимация при перемотре
        //dots: true, //показывать точки
        //dotsEach: true, //количество точек, соответствующих количеству слайдов
        //dotsData: true //для вставки значений в точки
        //lazyLoad: true, //для подгрузки изображений динамически
        //lazyLoadEager: 3, //для подгрузки одновременно картинок,
        //autoplay: true, //слайды сами двигаются
        //autoplayTimeout: 1000, //скорость автоматической прокрутки слайдов
        //autoplayHoverPause: true, //если на слайд наводив курсов мыши, то автопрокрутка останавливается
        //smartSpeed: 1000, //скорость перехода между слайдами
        //autoplaySpeed: 1000,//скорость, используемая при автопрокрутке
        //navSpeed: 1000, //скорость переключения между слайдами при нажатии стрелок
        //dotsSpeed: 1000, //скорость переключения между слайдами при нажатии точек
        //dragEndSpeed: 10000, //скорость переключения между слайдами при драге
        //callbacks: true //активирует возможность подвязывать на события колбэки
        //onDragged: ()=>console.log('onDragged')
        responsive: true, //при изменении ширины браузера слайдер адаптируется
        //responsiveRefreshRate: 3000 //как скоро произойдет адаптация при изменении ширины экрана
        responsive: {
            0:{ //от 0 до 600 px items равен 1, т.е. виден один слайд
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 2
            }
        },
        // respontiveBaseElement: '.container' //на какой элемент
        //video:true, //разрешает видео 
        //videoHeight: 100, //регулировка высоты видео
        //videoWidth: 100 //регулировка ширины видео
        //animateIn: 'animate__backInDown', //начало анимации
        //animateOut: 'animate__backOutRigth' //конец анимацииonInitialized
        //itemElement: 'ul',
        //stageElement: 'li'
        onInitialized: (event)=>console.log(`Количество слайдов: ` + event.item.count) //При инициализации карусели

    });

    owl.on('changed.owl.carousel', function(event){ //при возникновении события (нажатие NEXT или PREV)
        //localStorage.setItem(nameKeyLocalStorage, JSON.stringify(event.property));
        var obj = {
            name: event.property.name,
            value: event.property.value,
            toString: function() {
                return `name: ${this.name} value: ${this.value}`;
            }
        }
        localStorage.setItem(nameKeyLocalStorage, obj.toString());
    });
    
    $('.customNextBtn').click(function(){ //кастомное событие
        owl.trigger('next.owl.carousel');
    })
    $('.customPrevBtn').click(function(){ //кастомное событие
        owl.trigger('prev.owl.carousel');
    })
});