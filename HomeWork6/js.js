'use strict';

let miniature = document.querySelector('.miniature'); //Миниатюры
let bigImg = document.querySelector('.bigImage'); //Увеличенная картинка
let imageNow = null; //Текущая выделенная картинка

let defaultImage = 'image/default.jpg';

let arrImage = ['https://cdn-edge.kwork.ru/pics/t3/27/14493076-1620513527.jpg',
                'https://ksr-ugc.imgix.net/assets/022/795/678/d3b49124adc5b3d794e4b4987f819c6b_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1552&h=873&fit=crop&v=1538779729&auto=format&frame=1&q=92&s=13c81490a405a9727daa427f85d6d474',
                'https://avatars.mds.yandex.net/i?id=c8fa790bb01b9922b2497d526f16b837-5869577-images-thumbs&n=13',
                'https://avatars.dzeninfra.ru/get-zen_doc/3588827/pub_5ef229f0638cd448ff43548c_5ef385db20f0181d89c41b56/scale_1200',
                'https://avatars.mds.yandex.net/i?id=c119efb422cde492f0acb49f4bc36f6c02a80038-9028838-images-thumbs&n=13',
                'https://fuzeservers.ru/wp-content/uploads/7/c/1/7c11a3c5b46a7f735ed00d1c32e126b1.jpeg',
                'hjhjjhjh',
                'https://sli24.ru/wp-content/uploads/9/a/3/9a35a2b18fb5b50a0f62a93c51c96de1.jpeg',
                'https://cf.ppt-online.org/files/slide/7/7vpaMkn5DqCBErZAiUo8LHO9FSQTelGtWxJ024/slide-146.jpg',
                'https://avatars.mds.yandex.net/i?id=32eaa32dbbb3585dc0ba869e7f72434a573fd2a7-8216657-images-thumbs&n=13'
               ];
let countImageTagInArray = 0; //Количество загруженных атрибутов img в массив

function preloadImage(arrImage, callback){
    for (let i = 0; i < arrImage.length; i++) {
        let img = document.createElement('img');
        img.src = arrImage[i];
        img.alt = i;
        img.onload = ()=> callback(null, i, img);
        img.onerror = ()=> callback(new Error('Ошибка при загрузке картинки'), i, img);
    }
};

preloadImage(arrImage, function(error, index, img){
    if (error){
        let defaultImg = document.createElement('img');
        defaultImg.src = defaultImage
        defaultImg.alt = index;
        arrImage[index] = defaultImg;
    }
    else{
        arrImage[index] = img;
    }
    if (index==0){
        borderImageNow(arrImage[0]);
    }
    countImageTagInArray++;
    if (countImageTagInArray==arrImage.length){
        createImgTagInHtml();
    }
});

function createImgTagInHtml(){ //содание img на странице HTML
    for (let img of arrImage) {
        miniature.appendChild(img);
    }
}

function borderImageNow(img){ //Выделение текущей картинки рамкой
    bigImg.src = img.src;
    img.classList.add('borderImage');
    imageNow = img;
}

miniature.addEventListener('click', function(event){ //Событие клик на митиатуры
    if (event.target.tagName == 'IMG'){
        let img = event.target;
        imageNow.classList.remove('borderImage');
        borderImageNow(img);
    }
});