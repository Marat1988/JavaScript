'use strict';

/* По материалам из видео
https://youtu.be/YaM0CaDTshc
https://youtu.be/7o5sRSBlKwo - на мой взгляд лучшее объяснение
https://learn.javascript.ru/task/debounce?ysclid=lid2y857j6743694535
*/

function temp(e){
    console.log(e+" Привет");
}

const f = debounce(temp, 1000);

f(1);
f(2);

setTimeout(() => f(3), 100);
setTimeout(() => f(4), 1100);
setTimeout(() => f(5), 1500);

function debounce(callback, ms) {
    let isCooldown = false;
    return function() {
      if (isCooldown) return;
      callback.apply(this, arguments);
      isCooldown = true; 
      setTimeout(() => isCooldown = false, ms);
    };
}


// function debounce (fn, ms){
//     let timeout;
//     return function(){
//         const fncall = () => {fn.apply(this, arguments)}
//         clearTimeout(timeout);
//         timeout = setTimeout(fncall, ms);
//     };
// }

// function debounce(callback, delay) {
//     let timer;
//     return function(...args){
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             callback.apply(this, args);
//         }, delay);
//     }
// }
