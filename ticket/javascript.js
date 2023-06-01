'use strict';

let ticket = document.querySelector('.place');
let buy = document.getElementById('buy');

ticket.addEventListener('click', function(event){
    let clickElement = event.target;
    if (clickElement.classList.contains('numberPlace'))
    {
        if (clickElement.classList.contains('chooisePlace')){
            clickElement.classList.remove('chooisePlace');
        }
        else{
            clickElement.classList.add('chooisePlace');
            console.log(clickElement.innerText);
        }
    }
});

buy.addEventListener('click',function(){
    console.log('Привет');
});

