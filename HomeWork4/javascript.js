'use strict';

let ticket = document.querySelector('.place');
let buy = document.getElementById('buy');

const keyPlaces = "Места"; //Ключ localStorage
let freeArrayPlaces = []; //Массив свободных мест
const infoMessage = "СВОБОДНЫХ МЕСТ НЕТ! Но вы держитесь!"; //Сообщение на странице, если нет билетов! 

/*function getPlaces(){ //Пытался брать данные из JSON файла. С get разобрался. C POST нет. В общем, ничего не понял, но было интересно.
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
}*/

function getPlaces(){ //Получаем текущие свободные места (из localSrotage)
    if (localStorage.getItem(keyPlaces)==null) { //если ключа в localstorage нет, то добавляю его принудительно
        freeArrayPlaces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        localStorage.setItem(keyPlaces, JSON.stringify(freeArrayPlaces));
    }
    else{
        freeArrayPlaces = JSON.parse(localStorage.getItem(keyPlaces)); //Считываем свободные места
    }

    if (freeArrayPlaces.length===0){
        ticket.innerText = infoMessage;
    }
    else{
        for (let i = 0; i < freeArrayPlaces.length; i++){ //Добавляем свободные места в HTML
            let div = document.createElement('div');
            div.classList.add('numberPlace');
            div.innerHTML = freeArrayPlaces[i];
            ticket.appendChild(div);
        }
    }
}

getPlaces(); //Получение свободных мест

class User{
    #yearBirthDay
    #FIO
    #userArrPlaces
    #numberTicket

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
            return false;
        }
        if (this.#userArrPlaces.length === 0){
            alert('Вы не выбрали места!');
            return false;
        }
        if (this.#FIO.length===0) {
            alert('Вы не ввели своё ФИО!');
            return false;
        }
        this.#numberTicket = Math.floor(Math.random() * 1000); //Номер билета - случайное число
        return true;
    }

    getFIO(){
        return this.#FIO;
    }

    getNumberPlaces(){
        return this.#userArrPlaces;
    }

    getNumberTicket(){
        return this.#numberTicket;
    }

    showInfo(){
        alert(`Фамилия: ${this.#FIO}\nМеста: ${this.#userArrPlaces}\nНомер билета: ${this.#numberTicket}`);
    }
}

ticket.addEventListener('click', function(event){ //Один обработчик на DIV
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
    if (document.querySelectorAll('.chooisePlace').length>0){
        document.querySelector('.forms').style.display = "flex"; //Если есть выбранные места, то отображаем форму
    }
    else{
        document.querySelector('.forms').style.display = "none"; //В противном случае скрываем
    }
});

buy.addEventListener('click',function(event){
    let yearBirthDay = (new Date(document.getElementById('birthDay').value)).getUTCFullYear();
    let fio = (document.getElementById('FIO')).value;
    let arrPlacesDIV = document.querySelectorAll('.chooisePlace');
    let userArrPlaces = [];
    for (let i = 0; i < arrPlacesDIV.length; i++){
        userArrPlaces.push(+arrPlacesDIV[i].innerText);
    }
    let user = new User(yearBirthDay, fio,  userArrPlaces);
    if (user.checkInfo()==false){
        event.preventDefault();
    }
    else{
        user.showInfo();
        let newArrayFreePlaces = freeArrayPlaces.filter(function(x){
            return userArrPlaces.indexOf(x) < 0;
        });
        localStorage.setItem(keyPlaces, JSON.stringify(newArrayFreePlaces)); //Перезаписываем массив свободных мест

        let obj = {
            "ФИО": user.getFIO(),
            "Места": user.getNumberPlaces()
        };
        localStorage.setItem(user.getNumberTicket(),JSON.stringify(obj)); //Записываем данные о билете в localSrorage,  где ключ - это Номер билета
    }
});