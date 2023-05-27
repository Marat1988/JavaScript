'use strict';

const product = [
    {id: 110, name: 'НК  ,БАННОЕ 140г  МЫЛО', price: 44.08, suppliper: 'НЕВСКАЯ КОСМЕТИКА АО', balance: 987},
    {id: 117, name: 'НК  ,БАРХАТИСТОЕ 140г МЫЛО', price: 44.08, suppliper: 'НЕВСКАЯ КОСМЕТИКА АО', balance: 185},
    {id: 166, name: 'НК  , ДЕГТЯРНОЕ 140г МЫЛО', price: 53.41, suppliper: 'НЕВСКАЯ КОСМЕТИКА АО', balance: 17426},
    {id: 63542, name: 'СВЕЧА ХОЗЯЙСТВ.  50г   А4  (СантаООО)', price: 108.70, suppliper: 'РУБИН ООО', balance: 3249},
    {id: 63543, name: 'СВЕЧА ХОЗЯЙСТВ.  75г   А2  (СантаООО)', price: 74.10, suppliper: 'РУБИН ООО', balance: 2954},
    {id: 43885, name: 'РОМАНТИКА Лак Вол. 200млОЧ.С/Ф.РАСТ.ЭК(БЕЛ)', price: 92.10, suppliper: 'СИБИАР ОАО', balance: 121},
    {id: 43897, name: ' GOLDwind 300мл COFFEE ОСВЕЖ.', price: 71.50, suppliper: 'СИБИАР ОАО', balance: 818},
    {id: 43918, name: 'МОЛЕМОР ВАРАН 145мл ОТ МОЛИ АЭР.', price: 79.40, suppliper: 'СИБИАР ОАО', balance: 342}
]

const {form} = document.forms;
const isSelect = id => ['suppliper'].includes(id);

function getFormData(event){
    event.preventDefault();
    let filter = {};
    for (let field of form) {
        let {name} = field;
        if (name){
            let {value, id} = field;
            filter[name]=isSelect(id)?field.options[field.selectedIndex].text:value;
        };
    }
    let someProduct = product.filter(item => (item.price >= Math.min(filter.userBeginPrice,filter.userEndPrice) && item.price <= Math.max(filter.userBeginPrice,filter.userEndPrice)) && item.suppliper===filter.userSuppliper);
    console.log(someProduct.length > 0 ? someProduct: 'Товаров по вашему запросу не было найдено');
}

form.addEventListener('submit', getFormData);


