'use strict';

let road = document.querySelector('.track');
let cars= document.querySelectorAll('.car');

const distance = road.clientWidth; //Расстояние
const widthCar = document.querySelectorAll('.car')[0].clientWidth; //Ширина машины (по сути блока DIV). Они все одинаковые


class Player { //Класс игрок
    constructor(fio, car){
        this.car = car;
        this.fio = fio;
        this.finished = false;
        this.passTime= 0;
    }

    showInfo(){
        return `Расстояние: ${distance} px\nВремя:${this.passTime} ms\nСкорость:${distance/this.passTime} px/ms`;
    }
}

let players = [new Player('Max', cars[0]),
               new Player('Ivan', cars[1]),
               new Player('Marat', cars[2]),
               new Player('Daniil', cars[3]),
               new Player('Nikita', cars[4]),
               new Player('Daria', cars[5])]

let btnStart= document.getElementById('start'); //кнопка старта

btnStart.addEventListener('click', function(event){
    event.preventDefault();
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
            console.log(players);
            players.forEach(function(entry){
                  alert(entry.showInfo());
            });
        }
      }, 20);

});