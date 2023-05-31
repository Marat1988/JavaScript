'use strict';

/* По материалам из видео
https://youtu.be/YaM0CaDTshc
https://youtu.be/7o5sRSBlKwo - на мой взгляд лучшее объяснение
*/
const f = debounce(console.log, 1000);

f(1);
f(2);

setTimeout(() => f(3), 100);
setTimeout(() => f(4), 500);
setTimeout(() => f(5), 1100);

function debounce(callback, delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    }
}