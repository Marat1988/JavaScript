'use srtict';

let matrixA = document.getElementById('matrix-a'); //Матрица A
let matrixB = document.getElementById('matrix-b');//Матрица B
let matrixC = document.getElementById('matrix-c');//Матрица C
let swapMatrix = document.getElementById('change'); //Кнопка подмены матрицы местами
let clearMatrix = document.getElementById('clear'); //Кнопка очистки матриц от значений

let delRows = document.getElementById('del_rows'); //Кнопка удаления строки
let delColumn = document.getElementById('del_colums'); //Кнопка удаления строки
let addRows = document.getElementById('add_rows'); //Кнопка добавления строки
let addColum = document.getElementById('add_colums'); //Кнопка добавления столбцы
let multiply = document.getElementById('multiply'); //Кнопка умножения матриц

let checkMatrixA = document.getElementById('check_matrix_a'); //Check matrixA
let checkMatrixB = document.getElementById('check_matrix_b'); //Check matrixB
let errorMessage = document.querySelector('.error'); //для записи ошибок

const MaxColumn = 3; //Максимальное количество допустимых столбцов
const MaxRow =  3; //Максимальное количество допустимых строк
const minForInput = 1; //Минимальное число, допустимое в поле ввода
const maxForInput = 10; //Максимальное число, допустимое в поле ввода

function UserException(message) {
    this.message = message;
    this.name = "Гребанная ошибка";
  }

class Matrix{
    #matrixDimensionalArrayA
    #matrixDimensionalArrayB

    constructor(matrixDimensionalArrayA, matrixDimensionalArrayB){
        this.#matrixDimensionalArrayA = matrixDimensionalArrayA;
        this.#matrixDimensionalArrayB = matrixDimensionalArrayB;
    }

    multiplyMatrix(){
        if (this.#matrixDimensionalArrayA[0].length!=this.#matrixDimensionalArrayB.length){
            throw new UserException("Число столбцов первой матрицы не равно числу строк второй матрицы");
        }
        else{
            let result = new Array(this.#matrixDimensionalArrayA.length);
    
            for(let i = 0; i < result.length; i++){
                result[i] = new Array(this.#matrixDimensionalArrayB[i].length);
                for(let j = 0; j < this.#matrixDimensionalArrayA.length; j++){
                    result[i][j] = 0;
                    for(let k = 0; k < this.#matrixDimensionalArrayB.length; k++){
                        result[i][j]+=this.#matrixDimensionalArrayA[i][k] * this.#matrixDimensionalArrayB[k][j];
                    }
                }
            }
            return result;
        }
    }
};

function refreshForDeleteRow(matrix){ //Обновление информации о строках
    if (matrix.getElementsByTagName('tr').length<=MaxRow){
        delRows.classList.add('disabled_btn');
        delRows.disabled = true;
    }
    else{
        delRows.classList.remove('disabled_btn');
        delRows.disabled = false;
    }
}

function refreshForColumnDelete(matrix){ //Обновление информации о колонках
    if (matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length<=MaxColumn){
        delColumn.classList.add('disabled_btn');
        delColumn.disabled = true;
    }
    else{
        delColumn.classList.remove('disabled_btn');
        delColumn.disabled = false;
    }
}

function addRowInMatrix(matrix){ //Функция добавления строки
    let tbody = matrix.getElementsByTagName('tbody')[0];
    let colCount = matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length;
    let tr = document.createElement('tr');
    for (let i = 0; i< colCount; i++){
        createInputInMatrix(tr, false, null);
    }
    tbody.appendChild(tr);
    refreshForDeleteRow(matrix);
    refreshForColumnDelete(matrix);
}

function deleteRowInMatrix(matrix){ //функция удаления строки из матрицы
    let tr = matrix.getElementsByTagName('tr');
    let lastTr = tr[matrix.getElementsByTagName('tr').length-1];
    lastTr.parentNode.removeChild(lastTr);
    refreshForDeleteRow(matrix);
    refreshForColumnDelete(matrix);
}

function addColumnInMatrix(matrix){ //фцнкция добавления колонки
    let trs = matrix.querySelectorAll('tr');
    for (let tr of trs) {
        createInputInMatrix(tr, false, null);
    }
    refreshForDeleteRow(matrix);
    refreshForColumnDelete(matrix);
}

function deteleColumnInMatrix(matrix){ //Функция удаления столбца
    let trs = matrix.querySelectorAll('tr'); //все строки
    let colCount = matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length; //Число столбцов
    for (let i = 0; i<trs.length; i++){
        let lastTd = trs[i].getElementsByTagName('td')[colCount-1]; //последний столбец из td
        lastTd.parentNode.removeChild(lastTd); //Удаляем нахрен
    }
    refreshForDeleteRow(matrix);
    refreshForColumnDelete(matrix);
}

function createMatrix(matrix) { //Создание начальных матриц по-умолчанию
    let tbody = matrix.getElementsByTagName('tbody')[0];
    for (let row = 0; row < MaxRow; row++){
        let tr = document.createElement('tr'); //создаем строку
        tbody.appendChild(tr);
        for(let col = 0; col < MaxColumn; col++){
            createInputInMatrix(tr, false, null);
        }
    }
    refreshForDeleteRow(matrix);
    refreshForColumnDelete(matrix);
    document.querySelectorAll(".userInputNumber").forEach(function(currentInput) { //Чтобы не ввели больше положенного значения
        currentInput.oninput = function (event) {
            if (+event.target.value === 0){
                event.target.value = event.target.min;
            }
            if (+event.target.value > event.target.max){
                event.target.value = event.target.max;
            }
        }
    }); 
}

createMatrix(matrixA); //Создаем матрицы по-умолчанию
createMatrix(matrixB); //Создаем матрицы по-умолчанию

function createResultMatrix(matrix, operand){ //Создание результирующей матрицы
    try {
        let matrixNew = new Matrix(convertingMatrixIntoTwoDimensionalArray(matrixA),convertingMatrixIntoTwoDimensionalArray(matrixB));
        let matrixResult = null;
        if (operand=='*'){
            matrixResult = matrixNew.multiplyMatrix();
        }
        if (matrixResult.length>0){
            let tbody = matrix.getElementsByTagName('tbody')[0];
            while (tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            }
            for (let row = 0; row < matrixResult.length; row++){
                let tr = document.createElement('tr'); //создаем строку
                tbody.appendChild(tr);
                for(let col = 0; col < matrixResult[row].length; col++){
                    createInputInMatrix(tr, true, matrixResult[row][col]);
                }
            }
        }
      } catch (e) {
        errorMessage.innerText = e.name + '\n'+ e.message;
      }
}

createResultMatrix(matrixC, '*'); //Создание результирующей матрицы

function createInputInMatrix(tr, resultTable, number){ //Функция создания столбцов в матрице
    randNum=resultTable?number:Math.floor(Math.random() * (maxForInput - minForInput + 1)) + minForInput;
    let td = document.createElement('td'); //создаем столбец
    tr.appendChild(td);
    input = document.createElement('input'); //Текстовые поля ввода
    input.classList.add("userInputNumber");
    input.type='number';
    input.min = minForInput;
    input.max = maxForInput;
    input.valueAsNumber = randNum;
    input.required = true;
    input.setAttribute("value", randNum);
    td.appendChild(input);
}


/*Меняем матрицы местами*/
swapMatrix.addEventListener('click', function(){
    let tbodyA = matrixA.getElementsByTagName('tbody')[0];
    let tbodyB = matrixB.getElementsByTagName('tbody')[0];
    let tempTbodyA = tbodyA;
    let tempTbodyB = tbodyB;
    matrixA.appendChild(tempTbodyB);
    matrixB.appendChild(tempTbodyA);
    refreshForDeleteRow(matrixA);
    refreshForColumnDelete(matrixA);
    refreshForDeleteRow(matrixB);
    refreshForColumnDelete(matrixB);
});

/*Очистка матрицы*/
clearMatrix.addEventListener('click', function(){
    let tbody = document.getElementsByTagName('tbody');
    for(let i = 0; i< tbody.length; i++){
        while (tbody[i].firstChild) {
            tbody[i].removeChild(tbody[i].lastChild);
        }
    }
    createMatrix(matrixA); //Создаем матрицы по-умолчанию
    createMatrix(matrixB); //Создаем матрицы по-умолчанию
    createResultMatrix(matrixC, '*'); //Создание результирующей матрицы
});

checkMatrixA.addEventListener('change', function(){
    refreshForDeleteRow(matrixA);
    refreshForColumnDelete(matrixA);
});

checkMatrixB.addEventListener('change', function(){
    refreshForDeleteRow(matrixB);
    refreshForColumnDelete(matrixB);
});

function callFunction(nameFunction){ //Вывоз необходимой функции (добавление/удаление строки или столбца)
    if (checkMatrixA.checked){
        nameFunction(matrixA);
    }
    if (checkMatrixB.checked){
        nameFunction(matrixB);
    }
};

addRows.addEventListener('click',()=>callFunction(addRowInMatrix)); //Добавление строки

delRows.addEventListener('click',()=>callFunction(deleteRowInMatrix)); //Удаление строки

addColum.addEventListener('click', ()=>callFunction(addColumnInMatrix)); //Добавление колонки
   
delColumn.addEventListener('click',()=>callFunction(deteleColumnInMatrix)); //Удаление колонки

function convertingMatrixIntoTwoDimensionalArray(matrix){ //Преобразование матрицы в двумерный массив
    return Array.from(
        matrix.rows,
        row => Array.from(
          row.cells,
          cell => cell.querySelector('input').valueAsNumber
        ),
      );
};

multiply.addEventListener('click', ()=>createResultMatrix(matrixC,'*'));