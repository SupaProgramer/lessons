'use strict'
let age = document.getElementById('age');
function showUser(surname, name) {
	alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}
showUser.apply(age, ['Жмышенко','Валерий']);

let items = [];
for(var i = 0; i < 10; i++) {
    var item = function() {
        console.log(i);
	}
	console.log(item);
	items.push(item);
}
console.log(items);