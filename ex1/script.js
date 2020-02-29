
let money = prompt("Ваш бюджет на месяц?","");
let time = prompt("Введите дату в формате YYYY:MM:DD","");
let appData ={
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false
};
appData[prompt("Введите обязательную статью расходов в этом месяце","")]=prompt("Во сколько обойдется?","");
alert("Бюджет на 1 день: "+appData.budget/30);
