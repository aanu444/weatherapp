"use strict";


//setting consts for query selectors
const notification_element=document.querySelector(".notification");
const icon_element=document.querySelector(".img-cl");
const degree_element=document.querySelector("h1");
const description_element=document.querySelector("h3");
const location_element=document.querySelector("h4");
const inputValue=document.querySelector("input");
const btn=document.querySelector("button");


    //API key carefully saved
    const key="b8af53410cc7c9f61812f7f1d9cbf1bb";

    //App data
    const weather ={};

    //Setting weather unit temperature to celcius before setting Kelvin
    weather.temperature= {
        unit:"celsius"
    }; 

    const KELVIN = 273;

    //Button listening for event in order to take inputValue from input box
    btn.addEventListener('click', oneCallApi);
    
    function oneCallApi(){
        let api=`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${key}`;
        fetch(api)
        .then(function(response){
            let data= response.json();
            return data;
    }).then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.iconId=data.weather[0].icon;
        weather.description=data.weather[0].description;
        weather.city=data.name;
        weather.country=data.sys.country;
    }).then(function(){
        displayWeather();
    });
    };

    //display weather to UI
    function displayWeather(){
        icon_element.innerHTML=`<img src="icons/${weather.iconId}.png" alt="weather forecast">`;
        degree_element.innerHTML=`${weather.temperature.value}°<span>C</span>`;
        description_element.innerHTML=weather.description;
        location_element.innerHTML=`${weather.city}, ${weather.country}`;
        };

    //Setting LocalStorage
    const bttn=document.getElementById("bttn");
    const inputVal=document.getElementById("inputvalue");

    bttn.addEventListener("click", setLocalStorage);

    function setLocalStorage(){
        const key="Weather Search";
        const value=inputVal.value;
        console.log(key);
        console.log(value);

        if (key && value){
            localStorage.setItem(key,value);
            //location.reload();
        }
    }




   