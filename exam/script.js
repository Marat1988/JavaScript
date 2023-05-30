'use strict';

class Word {
    #userWord //Текущее состояние отгаданного слова пользователя
    #hiddenWord //Слово, полученное из JSON
    #countAttempts //Количество попыток
    #sybmol = '*'

    constructor(countAttempts){
        this.#countAttempts = countAttempts;
        this.#hiddenWord = 'ЦСКА'
        this.#userWord = this.#hiddenWord.replace(/[а-яА-ЯЁё]/g,this.#sybmol);
        document.querySelector('.word').innerText=this.getUserWord();
        document.querySelector('.countWord').innerText=this.getInfoCountAttempts();
    }

    getUserWord(){ //Вывести текущее состояние слова
        return `Текущее состояние слова: ${this.#userWord}`
    }

    getHiddenWord(){ //Вывести слово (в случае проигрыша)
        return `Загаданное слово: ${this.#hiddenWord}`
    }

    getInfoCountAttempts(){ //Вывести информацию о количестве оставшихся попыток
        return `Количество оставшихся попыток: ${this.#countAttempts}`
    }

    startMusic() { //Запускаем музон, чтобы было весело
        let audio = new Audio();
        audio.src = 'music/fl.mp3';
        audio.autoplay = true;
    }

    checkLetterInWord(letter){ //Проверка, есть ли буква в слове
        return this.#hiddenWord.indexOf(letter)>=0;
    }

    replaceLetterInUserWord(letter){ //Замена символа в текущем состоянии слова (если пользователь угадал)
        const regexp = new RegExp(`${letter}`,'g'); //Регулярное выражение. Поиск символа.
        const matches = [...this.#hiddenWord.matchAll(regexp)]; //Получаем массив, где содержится буква
        const indexes = matches.map(match => match.index); //Индексы из найденного выше массива
        let tempArray = this.#userWord.split(''); //Временно создаем массив
        for (let i = 0; i < indexes.length; i++){ //Заменяем символ * на найденную букву (по индексам)
            tempArray[indexes[i]] = this.#hiddenWord[indexes[i]];
        }
        this.#userWord = tempArray.join(''); //записываем слово
        document.querySelector('.word').innerText=this.getUserWord(); //Выводим текущее состояние слова
        if (this.#countAttempts>0 && this.#userWord.split('').filter(sybmol=>sybmol==this.#sybmol).length===0){
            this.showstatistics(true);
        }
    }

    reduceCountAttempts(){ //Уменьшение количества попыток
        this.#countAttempts--;
        document.querySelector('.countWord').innerText=this.getInfoCountAttempts();
        if (this.#countAttempts===0 && this.#userWord.split('').filter(sybmol=>sybmol==this.#sybmol).length>0){
            this.showstatistics(false);
        }
    }

    showstatistics(winning){
        let titleMessage = winning?"Поздравляю! Вы выиграли! Обновите страницу и сыграйте еще раз (при желании)!!\n":"К сожалению, вы проиграли. Не отчаивайтесь!. Обновите страницу и попробуйте еще раз!\n";
        alert(titleMessage+'\n'+this.getUserWord()+'\n'+this. getHiddenWord()+'\n'+this.getInfoCountAttempts());
    }

    gameOver(){ //Проверка на конец игры
        return this.#countAttempts===0 || this.#userWord.split('').filter(sybmol=>sybmol==this.#sybmol).length===0;
    }
}

let word = new Word(5);
word.startMusic();

let alphabet = document.querySelector('.alphabet');
alphabet.addEventListener('click',function(event){
    if (event.target.tagName === 'BUTTON'){
        if (!word.gameOver()){
            if (word.checkLetterInWord(event.target.innerText)){
                word.replaceLetterInUserWord(event.target.innerText);
            }
            else{
                word.reduceCountAttempts();
            }
            event.target.disabled = true;
        }
        else{
            alert('Игра закончена! Пожалуйста, обновите страницу!');
        }
    }
});