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
    savings : true,
    chooseExpenses: function() {
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
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget/30).toFixed();
        alert("Бюджет на 1 день: " + appData.moneyPerDay);
    },
    detectLevel: function() {
        if(appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if(appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Ошибка");
        }
    },
    checkSavings: function() {
        if(appData.savings) {
            let save = +prompt("Какова сумма накоплений?",""),
                percent = +prompt("Какой процент","");
                appData.monthIncome = save/100/12*percent;
                alert("Доход в месяц с депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for (let i = 0; i < 3; i++) {
            appData.optionalExpenses[i+1] = prompt("Статья необязательных расходов?", "");
        }
    },
    chooseIncome: function() {
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)","");
        while(typeof(items) != 'string' || items == '' || items == null) {
            items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)","");
        } 
        appData.income = items.split(', ');
        let lastItem = prompt('Что-то ещё?','');
        while(typeof(lastItem) != 'string' || lastItem == '' || lastItem == null) {
            lastItem = prompt('Что-то ещё?','');
        }
        appData.income.push(lastItem);
        appData.income.sort(); 
    },
    showIncome: function() {
        let message = 'Способы доп. заработка: \n';
        this.income.forEach(function(item,i) {
            if(i != 0) {
                message+='-' + item +'\n';
            }
        });
        alert(message);
    },
    showData: function() {
        console.log("Наша программа включает в себя данные:\n");
        for(key in this) {
            console.log(key + '\n');
        }
    }
};
start();
if('Ёжик'<'яблоко'){
    console.log(1);
}


