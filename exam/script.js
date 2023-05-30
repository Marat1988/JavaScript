'use strict';

class Word {
    #userWord //Текущее состояние отгаданного слова пользователя
    #hiddenWord //Слово, полученное из JSON
    #countAttempts //Количество попыток
    #sybmol = '*' //Символ для скрытия слова

    constructor(countAttempts, hiddenWord) {
        this.#countAttempts = countAttempts;
        this.#hiddenWord =  hiddenWord;
        this.#userWord = this.#hiddenWord.replace(/[а-яА-ЯЁё]/g, this.#sybmol);
        document.querySelector('.word').innerText = this.getUserWord();
        document.querySelector('.countWord').innerText = this.getInfoCountAttempts();
    }

    getUserWord() { //Вывести текущее состояние слова
        return `Текущее состояние слова: ${this.#userWord}`
    }

    getHiddenWord() { //Вывести слово (в случае проигрыша)
        return `Загаданное слово: ${this.#hiddenWord}`
    }

    getInfoCountAttempts() { //Вывести информацию о количестве оставшихся попыток
        return `Количество оставшихся попыток: ${this.#countAttempts}`
    }

    checkLetterInWord(letter) { //Проверка, есть ли буква в слове
        return this.#hiddenWord.indexOf(letter) >= 0;
    }

    replaceLetterInUserWord(letter) { //Замена символа в текущем состоянии слова (если пользователь угадал)
        const regexp = new RegExp(`${letter}`,'g'); //Регулярное выражение. Поиск символа.
        const matches = [...this.#hiddenWord.matchAll(regexp)]; //Получаем массив, где содержится буква
        const indexes = matches.map(match => match.index); //Индексы из найденного выше массива
        let tempArray = this.#userWord.split(''); //Временно создаем массив
        for (let i = 0; i < indexes.length; i++){ //Заменяем символ * на найденную букву (по индексам)
            tempArray[indexes[i]] = this.#hiddenWord[indexes[i]];
        }
        this.#userWord = tempArray.join(''); //перезаписываем слово
        document.querySelector('.word').innerText = this.getUserWord(); //Выводим текущее состояние слова
        if (this.#countAttempts > 0 && this.#userWord.split('').filter(sybmol => sybmol == this.#sybmol).length === 0) {
            this.showstatistics(true);
        }
    }

    reduceCountAttempts() { //Уменьшение количества попыток
        this.#countAttempts--;
        document.querySelector('.countWord').innerText=this.getInfoCountAttempts();
        if (this.#countAttempts === 0 && this.#userWord.split('').filter(sybmol => sybmol == this.#sybmol).length > 0) {
            this.showstatistics(false);
        }
    }

    showstatistics(winning) {
        let titleMessage = winning?"Поздравляю! Вы выиграли! Обновите страницу и сыграйте еще раз (при желании)!!\n":"К сожалению, вы проиграли. Не отчаивайтесь!. Обновите страницу и попробуйте еще раз!\n";
        if (winning===false){
            document.body.style.backgroundImage = "url('picture/galows.png')";
        }
        alert(titleMessage + '\n' + 'Статистика' + '\n' + this.getUserWord() + '\n' + this.getHiddenWord() + '\n' + this.getInfoCountAttempts());
    }

    gameOver() { //Проверка на конец игры
        return this.#countAttempts === 0 || this.#userWord.split('').filter(sybmol => sybmol == this.#sybmol).length === 0;
    }
}

let request = new XMLHttpRequest();
request.open('GET', 'settings.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('readystatechange', function(){
    if (request.readyState == 4 && request.status == 200){
        let data = JSON.parse(request.response);
        let clubs = data.clubs; //Получаем массив футбольных клубов из JSON
        let userClubs = clubs[Math.floor(Math.random() * clubs.length)];
        let word = new Word(data.countAttempts, userClubs);
        let alphabet = document.querySelector('.alphabet');
        alphabet.addEventListener('click',function(event) {
            if (event.target.tagName === 'BUTTON'){
                if (!word.gameOver()) {
                    if (word.checkLetterInWord(event.target.innerText)) {
                        word.replaceLetterInUserWord(event.target.innerText);
                    }
                    else{
                        word.reduceCountAttempts();
                    }
                    event.target.disabled = true;
                }
                else {
                    alert('Игра окончена! Для начала новой игры обновите страницу!');
                }
            }
        });
    }
    else{
        document.querySelector('.word').innerText = 'Сервер временно недоступен! Зайдите позже';
    }
});