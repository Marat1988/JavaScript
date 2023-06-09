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
const minColumnCount = 3; //минимальное количество допустимых столбцов
const minRowCount =  3; //минимальное количество допустимых строк
const maxColumnCount = 6; //максимальное количество допустимых столбцов
const maxRowCount = 6; //максимальное количество допустимых строк
const minForInput = 1; //Минимальное число, допустимое в поле ввода
const maxForInput = 10; //Максимальное число, допустимое в поле ввода

/* Класс и обработчик ошибок*/
function MatrixException(message) {
    this.message = message;
    this.name = "УРА! У меня появилась ошибка!";
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
            throw new MatrixException("Число столбцов первой матрицы не равно числу строк второй матрицы");
        }
        else{
            let rowsA = this.#matrixDimensionalArrayA.length, 
                rowsB = this.#matrixDimensionalArrayB.length,
                colsB = this.#matrixDimensionalArrayB[0].length,
                result = []
                for (let i = 0; i < rowsA; i++)
                    result[i] = [];

                for (let k = 0; k < colsB; k++)
                { 
                    for (let i = 0; i < rowsA; i++)
                    { 
                        let sum = 0;
                        for (let j = 0; j < rowsB; j++) 
                            sum += this.#matrixDimensionalArrayA[i][j]*this.#matrixDimensionalArrayB[j][k];
                        result[i][k] = sum;
                    }
                }
            return result;
        }
    }
};

/* Мои функции*/
function refreshForAddDeleteRow(matrix){ //Обновление возможности добавления строк
    if (matrix.getElementsByTagName('tr').length<=minRowCount){
        delRows.classList.add('disabled_btn');
        delRows.disabled = true;
    }
    else{
        delRows.classList.remove('disabled_btn');
        delRows.disabled = false;
    }

    if (matrix.getElementsByTagName('tr').length>=maxRowCount){
        addRows.classList.add('disabled_btn');
        addRows.disabled = true;
    }
    else{
        addRows.classList.remove('disabled_btn');
        addRows.disabled = false;
    }
}

function refreshForAddDeleteColumn(matrix){ //Обновление возможности добавления колонок
    if (matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length<=minColumnCount){
        delColumn.classList.add('disabled_btn');
        delColumn.disabled = true;
    }
    else{
        delColumn.classList.remove('disabled_btn');
        delColumn.disabled = false;
    }

    if (matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length>=maxColumnCount){
        addColum.classList.add('disabled_btn');
        addColum.disabled = true;
    }
    else{
        addColum.classList.remove('disabled_btn');
        addColum.disabled = false;
    }
    errorMessage.innerText = '';
}

function refreshForListenerOnInput(){ //Обновления обработчика события input
    document.querySelectorAll(".form-control").forEach(function(currentInput) { //Чтобы не ввели больше положенного значения
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

function addRowInMatrix(matrix){ //Функция добавления строки
    let tbody = matrix.getElementsByTagName('tbody')[0];
    let colCount = matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length;
    let tr = document.createElement('tr');
    for (let i = 0; i< colCount; i++){
        createInputInMatrix(tr, false, null);
    }
    tbody.appendChild(tr);
    refreshForAddDeleteRow(matrix);
    refreshForAddDeleteColumn(matrix);
}

function deleteRowInMatrix(matrix) { //функция удаления строки из матрицы
    let tr = matrix.getElementsByTagName('tr');
    let lastTr = tr[matrix.getElementsByTagName('tr').length-1];
    lastTr.parentNode.removeChild(lastTr);
    refreshForAddDeleteRow(matrix);
    refreshForAddDeleteColumn(matrix);
}

function addColumnInMatrix(matrix){ //функция добавления колонки
    let trs = matrix.querySelectorAll('tr');
    for (let tr of trs) {
        createInputInMatrix(tr, false, null);
    }
    refreshForAddDeleteRow(matrix);
    refreshForAddDeleteColumn(matrix);
}

function deteleColumnInMatrix(matrix){ //Функция удаления столбца
    let trs = matrix.querySelectorAll('tr'); //все строки
    let colCount = matrix.getElementsByTagName('tr')[0].getElementsByTagName('td').length; //Число столбцов
    for (let i = 0; i<trs.length; i++){
        let lastTd = trs[i].getElementsByTagName('td')[colCount-1]; //последний столбец из td
        lastTd.parentNode.removeChild(lastTd); //Удаляем нахрен
    }
    refreshForAddDeleteRow(matrix);
    refreshForAddDeleteColumn(matrix);
}

function createMatrix(matrix) { //Создание начальных матриц по-умолчанию
    let tbody = matrix.getElementsByTagName('tbody')[0];
    for (let row = 0; row < minRowCount; row++){
        let tr = document.createElement('tr'); //создаем строку
        tbody.appendChild(tr);
        for(let col = 0; col < minColumnCount; col++){
            createInputInMatrix(tr, false, null);
        }
    }
    refreshForAddDeleteRow(matrix);
    refreshForAddDeleteColumn(matrix);
    refreshForListenerOnInput();
}

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

function createInputInMatrix(tr, resultMatrix, number){ //Функция создания столбцов в матрице
    randNum=resultMatrix?number:Math.floor(Math.random() * (maxForInput - minForInput + 1)) + minForInput;
    let td = document.createElement('td'); //создаем столбец
    tr.appendChild(td);
    input = document.createElement('input'); //Текстовые поля ввода
    if (resultMatrix){
        input.disabled = true;
    }
    input.classList.add('form-control'); //Класс из style
    input.type='number';
    input.min = minForInput;
    input.max = maxForInput;
    input.valueAsNumber = randNum;
    input.required = true;
    input.setAttribute("value", randNum);
    td.appendChild(input);
}

function convertingMatrixIntoTwoDimensionalArray(matrix){ //Преобразование матрицы в двумерный массив
    return Array.from(
        matrix.rows,
        row => Array.from(
          row.cells,
          cell => cell.querySelector('input').valueAsNumber
        ),
      );
};

createMatrix(matrixA); //Создаем матрицы по-умолчанию
createMatrix(matrixB); //Создаем матрицы по-умолчанию
createResultMatrix(matrixC, '*'); //Создание результирующей матрицы

/* addEventListener*/
swapMatrix.addEventListener('click', function(){ /*Меняем матрицы местами*/
    let tbodyA = matrixA.getElementsByTagName('tbody')[0];
    let tbodyB = matrixB.getElementsByTagName('tbody')[0];
    let tempTbodyA = tbodyA;
    let tempTbodyB = tbodyB;
    matrixA.appendChild(tempTbodyB);
    matrixB.appendChild(tempTbodyA);
    
    if (checkMatrixA.checked){
        refreshForAddDeleteRow(matrixA);
        refreshForAddDeleteColumn(matrixA);
    }
    else{
        refreshForAddDeleteRow(matrixB);
        refreshForAddDeleteColumn(matrixB);
    }
    refreshForListenerOnInput();
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
    refreshForAddDeleteRow(matrixA);
    refreshForAddDeleteColumn(matrixA);
});

checkMatrixB.addEventListener('change', function(){
    refreshForAddDeleteRow(matrixB);
    refreshForAddDeleteColumn(matrixB);
});

function callFunction(nameFunction){ //Вывоз необходимой функции (добавление/удаление строки или столбца)
    if (checkMatrixA.checked){
        nameFunction(matrixA);
    }
    if (checkMatrixB.checked){
        nameFunction(matrixB);
    }
    refreshForListenerOnInput();
};

addRows.addEventListener('click',()=>callFunction(addRowInMatrix)); //Добавление строки
delRows.addEventListener('click',()=>callFunction(deleteRowInMatrix)); //Удаление строки
addColum.addEventListener('click', ()=>callFunction(addColumnInMatrix)); //Добавление колонки
delColumn.addEventListener('click',()=>callFunction(deteleColumnInMatrix)); //Удаление колонки
multiply.addEventListener('click', ()=>createResultMatrix(matrixC,'*')); //Умножение матриц
matrixA.addEventListener('click',function(){ //Выделение активной таблицы
    matrixB.classList.remove('active');
    matrixA.classList.add('active');
});
matrixB.addEventListener('click',function(){ //Выделение активной таблицы
    matrixA.classList.remove('active');
    matrixB.classList.add('active');
});