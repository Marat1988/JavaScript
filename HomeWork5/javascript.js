'use strict';

let road = document.querySelector('.track');
let btnStart = document.getElementById('start');

let Max = document.querySelector('.Max');
console.log(Max);

let car = document.querySelectorAll('.car');
console.log(car);

let button = document.getElementById('test');
console.log(button);

button.addEventListener('click', function(){
    console.log(`Ширина полосы ${road.clientWidth}`);
    // let left = Max.offsetLeft;
    // left+=50;
    // Max.style.left = left+'px';
    // console.log(left);

    let start = Date.now();
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        Max.style.left = timePassed / 5 + 'px';

        if (timePassed > 6000) clearInterval(timer);

      }, 20);
});

btnStart.addEventListener('click', function(event){
    event.preventDefault();
    alert('Пока не работает');
})

