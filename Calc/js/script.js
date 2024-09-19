'use strict';

const inputEur = document.querySelector('#eur'),
    inputUsd = document.querySelector('#usd'),
    inputStr = document.querySelector('#str');

inputEur.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => {
        if (request.status === 200) {
            const data = JSON.parse(request.response);
            if (isNaN(`${parseInt(inputEur.value)}`) == true){
                document.getElementById("usd").value = "please enter a number";
                document.getElementById("str").value = "please enter a number"
            } else {
                inputUsd.value = (+inputEur.value * data.current.usd).toFixed(2);
                inputStr.value = (+inputEur.value * data.current.str).toFixed(2);
            }
        } 
        else {
            inputUsd.value = "Something went wrong";
            inputStr.value = "Something went wrong";
        }
    });

});