window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')) {
            for(let i = 0;i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let deadLine = '2020-03-07 13:06:10';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / 3600 / 1000);
            return {
                'total':t,
                'hours':hours,
                'minutes':minutes,
                'seconds':seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if(t.total > 0) {
                hours.textContent = (t.hours >= 10)?t.hours:'0' + t.hours;
                minutes.textContent = (t.minutes >= 10)?t.minutes:'0' + t.minutes;
                seconds.textContent = (t.seconds >= 10)?t.seconds:'0' + t.seconds;
            }
            else {
                clearInterval(timeInterval);
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }
    }

    setClock('timer',deadLine);

    //Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelectorAll('.description-btn');

        more.addEventListener('click', () => {
            overlay.style.display = 'block';
            more.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        description.forEach(element => {
            element.addEventListener('click', () => {
                overlay.style.display = 'block';
                more.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            });
        });

        // Forms

        let message = {
            loading: "Загрузка...",
            success: "Спасибо, скоро мы с вами свяжемся.",
            failure: "Что-то пошло не так!"
        };

        let modulForm = document.querySelector('.main-form'),
            input = modulForm.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

        modulForm.addEventListener('submit', (event) => {
            event.preventDefault();
            modulForm.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(modulForm);

            let obj = {};
            formData.forEach((value, key) =>{
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(json);

            let promise = new Promise((resolve, reject) => {
                request.addEventListener('readystatechange', () => {
                    if(request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
                
                for(let i = 0; i < input.length; i++) {
                    input[i].value = "";
                }
            });

            promise
                    .then(() => {
                        statusMessage.innerHTML = message.loading;
                    })
                    .then(() => {
                        statusMessage.innerHTML = message.success;
                    })
                    .catch(() => {
                        statusMessage.innerHTML = message.failure;
                    });
        });
            

        let contactForm = document.querySelector('#form'),
            contactInput = contactForm.getElementsByTagName('input');
        
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactForm.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(contactForm);

            let obj = {};
            formData.forEach((value, key) =>{
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(json);

            let promise = new Promise((resolve, reject) => {
                request.addEventListener('readystatechange', () => {
                    if(request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
                
                for(let i = 0; i < contactInput.length; i++) {
                    contactInput[i].value = "";
                }
            });
            promise
                    .then(() => {
                        statusMessage.innerHTML = message.loading;
                    })
                    .then(() => {
                        statusMessage.innerHTML = message.success;
                    })
                    .catch(() => {
                        statusMessage.innerHTML = message.failure;
                    });
        });

        // Slider
        let slideIndex = 1,
            slides = document.querySelectorAll('.slider-item'),
            prev = document.querySelector('.prev'),
            next = document.querySelector('.next'),
            dotsWrap = document.querySelector('.slider-dots'),
            dots = document.querySelectorAll('.dot');
        
        showSlides(slideIndex);

        function showSlides(n) {
            if(n > slides.length) {
                slideIndex = 1;
            }
            if(n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach((elem) => elem.style.display = "none");

            dots.forEach((elem) => elem.classList.remove('dot-active'));

            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        };

        function plusSlides(n) {
            showSlides(slideIndex+=n);
        };

        function currentSlies(n) {
            showSlides(slideIndex = n);
        }
        
        prev.addEventListener('click', () => {
            plusSlides(-1);
        });
        next.addEventListener('click', () => {
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', (event) => {
            let target = event.target;
            for(let i = 1; i <= dots.length; i++) {
                if(target.classList.contains('dot') && target == dots[i-1]) {
                    currentSlies(i);
                }
            }
        });

        // Calculator
        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            daysSum = 0,
            personsSum = 0,
            total = 0;
        
            totalValue.innerHTML = total;

            persons.addEventListener('change', function() {
                personsSum = +this.value;
                total = (daysSum + personsSum) * 4000;
                if(restDays.value == '' || this.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });

            restDays.addEventListener('change', function() {
                daysSum = +this.value;
                total = (daysSum + personsSum) * 4000;
                if(persons.value == '' || this.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });
});