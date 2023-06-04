'use strict';

let road = document.querySelector('.track'); //гоночный трек
let cars= document.querySelectorAll('.car'); //Массив машин
let statistic = document.querySelector('.statistic'); //статистика
const {form} = document.forms;
const distance = road.clientWidth; //Расстояние
const widthCar = document.querySelectorAll('.car')[0].clientWidth; //Ширина машины (по сути блока DIV). Они все одинаковые

let userPlayser = document.getElementById('choosePlayer'); //Выбор пользователя игрока
let userPlaces = document.getElementById('place'); //Выбор пользователя места
let userBet = document.getElementById('bet'); //Ставка пользователя

class Player { //Класс игрок
    constructor(fio, car){
        this.car = car;
        this.fio = fio;
        this.finished = false;
        this.passTime= 0;
    }

    showInfo(){
        return `Игрок: ${this.fio}. Расстояние: ${distance} px. Время: ${this.passTime} ms. Скорость: ${distance/this.passTime} px/ms\n`;
    }
}

let players = [new Player('Max', cars[0]),
               new Player('Ivan', cars[1]),
               new Player('Marat', cars[2]),
               new Player('Daniil', cars[3]),
               new Player('Nikita', cars[4]),
               new Player('Daria', cars[5])]

let btnStart= document.getElementById('start'); //кнопка старта

function getFormData(event){
    event.preventDefault();
    writeStatistic(`Выбранный игрок: ${userPlayser.options[userPlayser.selectedIndex].text}. Выбранное место: ${userPlaces.value}. Ваша ставка: ${userBet.value}\n\n`);
    btnStart.disabled = true;
    let start = Date.now(); //Время старта
    let timer = setInterval(function() {
        for (const race of players) {
            let randomDistance = Math.floor(Math.random() * (10 - 1) + 1); //Случайное расстояние
            if (race.finished===false){
                race.car.style.left = (race.car.offsetLeft + randomDistance) + 'px'; //Типа машина едет
                if ((race.car.offsetLeft + widthCar) > (distance + widthCar)) { //Пока не пересечет линию
                    race.finished=true;
                    race.passTime = (Date.now() - start);
                }
            }
        }
        let notFinished = players.filter(player=>player.finished===false).length; //Количество не финишировавших
        if (notFinished===0){
            clearInterval(timer);
            players.sort(compare);
            players.forEach(function(entry){
                writeStatistic(entry.showInfo());
            });
            infoAboutWinnings();
            writeStatistic('\nДля запуска новой игры обновите страницу!');
        }
      }, 20);
}

function writeStatistic(info) { //Запись статистики в DIV
    statistic.innerText+=info;
}

function compare(player1, player2){ //для сортировки массива с целью определения победителя
    if (player1.passTime > player2.passTime) return 1;
    if (player1.passTime == player2.passTime) return 0;
    if (player1.passTime < player2.passTime) return -1;
}

function infoAboutWinnings(){
    let playerUserPlace = players.map(x=>x.fio).indexOf(userPlayser.options[userPlayser.selectedIndex].text) + 1;
    writeStatistic(`\nВаш игрок занял ${playerUserPlace} место.`);
}

form.addEventListener('submit', getFormData);

