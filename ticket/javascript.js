'use strict';

let ticket = document.querySelector('.place');
let buy = document.getElementById('buy');

function getPlaces(){ //Список мест
    let request = new XMLHttpRequest();
    request.open('GET', 'data.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', function(){
        if (request.readyState === 4 && request.status == 200){
            let dataPlaces = JSON.parse(request.response);
            let arrPlaces = dataPlaces.places;
            if (arrPlaces.length > 0){
                for (let i = 0; i < arrPlaces.length; i++){
                    let div = document.createElement('div');
                    div.classList.add('numberPlace');
                    div.innerHTML = arrPlaces[i];
                    let form = document.getElementById('form');
                    form.parentNode.insertBefore(div,form);
                }
            }
        }
    });
}

getPlaces();

class User{
    #yearBirthDay
    #FIO
    #userArrPlaces

    constructor(yearBirthDay, fio, userArrPlaces){
        this.#yearBirthDay = yearBirthDay;
        this.#FIO = fio;
        this.#userArrPlaces = userArrPlaces;
    }

    checkInfo(){
        let yearNow = (new Date()).getFullYear();
        let age = yearNow - this.#yearBirthDay;
        if (age < 18 || this.#yearBirthDay===undefined || Number.isNaN(this.#yearBirthDay)){
            alert('Вам нет 18 лет! В покупке отказано!');
            return;
        }
        if (this.#userArrPlaces.length === 0){
            alert('Вы не выбрали места!');
            return;
        }
        if (this.#FIO.length===0) {
            alert('Вы не ввели своё ФИО!');
            return;
        }
        this.#showInfo();
    }

    #showInfo(){
        alert(`Фамилия: ${this.#FIO}\nМеста: ${this.#userArrPlaces}`);
    }
}

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

buy.addEventListener('click',function(event){
    event.preventDefault();
    let yearBirthDay = (new Date(document.getElementById('birthDay').value)).getUTCFullYear();
    let fio = (document.getElementById('FIO')).value;
    let arrPlacesDIV = document.querySelectorAll('.chooisePlace');
    let userArrPlaces = [];
    for (let i = 0; i < arrPlacesDIV.length; i++){
        userArrPlaces.push(arrPlacesDIV[i].innerText);
    }
    let user = new User(yearBirthDay, fio,  userArrPlaces);
    user.checkInfo();
});