let startBth = document.getElementById('start');
let result = document.querySelector('.result-table');
let values = result.querySelectorAll(':nth-child(2n)');
let expenses = document.querySelectorAll('.expenses-item');
let buttons = document.getElementsByTagName('button');
let bth1 = buttons[0];
let bth2 = buttons[1];
let bth3 = buttons[2];
let optionalExpenses = document.querySelectorAll('.optionalexpenses-item');
let income = document.querySelector('#income');
let savings = document.querySelector('#savings');
let sum = document.querySelector('#sum');
let percent = document.querySelector('#percent');
let day = document.querySelector('.day-value');
let month = document.querySelector('.month-value');
let year = document.querySelector('.year-value');

let money,time;

startBth.addEventListener('click', function() {
    appData.active = true;
    time = prompt("Введите дату в формате YYYY:MM:DD","");
    money = +prompt("Ваш бюджет на месяц?","");

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?","");
    }
    appData.budget = money;
    appData.timeData = time;
    values[0].textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
});

bth1.addEventListener('click', function() {
    if(appData.active) {
        let sum = 0;
        for (let i = 0; i < expenses.length; i++) {
            let a = expenses[i].value,
            b = expenses[++i].value;
            if(typeof(a) === "string" && typeof(a) != null && typeof(b) != null
            && a != '' && b != '' && a.length<50) {
                console.log("done");
                appData.expenses[a] = b;
                sum += +b;
            } else {
                i-=1;
            }
        }
        values[3].textContent = sum;
    }
});

bth2.addEventListener('click', function() {
    if(appData.active) {
        for (let i = 0; i < optionalExpenses.length; i++) {
            let opt = optionalExpenses[i].value;
            appData.optionalExpenses[i] = opt;
            values[4].textContent += appData.optionalExpenses[i] + ' ';
        }
    }
});

bth3.addEventListener('click', function() {
    if(appData.active) {
        if(appData.budget != undefined) {
            appData.moneyPerDay = ((appData.budget-values[3].textContent)/30).toFixed();
            values[1].textContent = +appData.moneyPerDay;
    
            if(appData.budget <= 100) {
                values[2].textContent = "Минимальный уровень достатка";
            } else if(appData.budget > 100 && appData.budget < 2000) {
                values[2].textContent = "Средний уровень достатка";
            } else if(appData.budget >= 2000) {
                values[2].textContent = "Высокий уровень достатка";
            }
        } else {
            values[1].textContent = "Ошибка";
        }
    }
});

income.addEventListener('input', function() {
    if(appData.active) {
        let items = income.value;
        appData.income = items.split(', ');
        values[5].textContent = appData.income;
    }
});

savings.addEventListener('click', function() {
    if(appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sum.addEventListener('input', function() {
    if(appData.active) {
        if(appData.savings == true) {
            let Sum = +sum.value,
                Percent = +percent.value;
            appData.monthIncome = Sum/100/12*Percent;
            appData.yearIncome = Sum/100*Percent;
            values[6].textContent = appData.monthIncome.toFixed(1);
            values[7].textContent = appData.yearIncome.toFixed(1);
        }
    }
});

percent.addEventListener('input', function() {
    if(appData.active) {
        if(appData.savings == true) {
            let Sum = +sum.value,
                Percent = +percent.value;
            appData.monthIncome = Sum/100/12*Percent;
            appData.yearIncome = Sum/100*Percent;
            values[6].textContent = appData.monthIncome.toFixed(1);
            values[7].textContent = appData.yearIncome.toFixed(1);
        }
    }
});

let appData ={
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
    active:false
};
