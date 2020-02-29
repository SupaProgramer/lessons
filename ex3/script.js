let money,time;

function start() {
    money = +prompt("Ваш бюджет на месяц?","");
    time = prompt("Введите дату в формате YYYY:MM:DD","");

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?","");
    }
    appData.budget = money;
}

let appData ={
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : true
};

start();
chooseExpenses();
detectDayBudget();
detectLevel();
checkSavings();
chooseOptExpenses();

function chooseExpenses() {
    for (let i=0; i < 2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце",""),
        b = prompt("Во сколько обойдется?","");
        if(typeof(a) === "string" && typeof(a) != null && typeof(b) != null
        && a != '' && b != '' && a.length<50) {
            console.log("done");
            appData.expenses[a] = b;
        } else {
            i-=1;
        }
    };
}


function detectDayBudget() {
    appData.moneyPerDay = (appData.budget/30).toFixed();
    alert("Бюджет на 1 день: " + appData.moneyPerDay);
}

function detectLevel() {
    if(appData.moneyPerDay < 100) {
        console.log("Минимальный уровень достатка");
    } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if(appData.moneyPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Ошибка");
    }
}

function checkSavings() {
    if(appData.savings) {
        let save = +prompt("Какова сумма накоплений?",""),
            percent = +prompt("Какой процент","");
            appData.monthIncome = save/100/12*percent;
            alert("Доход в месяц с депозита: " + appData.monthIncome);
        }
}

function chooseOptExpenses() {
    for (let i = 0; i < 3; i++) {
            appData.optionalExpenses[i+1] = prompt("Статья необязательных расходов?", "");
    }
}