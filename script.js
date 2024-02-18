const apiKey = "6f91af6659e7ff593706d48284a1f61e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&";
const searchBar = document.querySelector(".search #search");
const searchBtn = document.querySelector(".search button");
const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

async function weatherInfo(city){
    const response = await fetch(apiUrl + `q=${city}` +`&appid=${apiKey}`);  
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".card").style.display = "none";
    }  
    else{
        let data =await response.json();
        document.getElementById("icon").src = "Images&Icons/" + data.weather[0].icon + ".png";
        document.querySelector(".card p").innerHTML = data.weather[0].main;
        document.querySelector(".info-right #temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".info-left #wind-speed").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".info-left #humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".info-right #location").innerHTML = data.name + "," + data.sys.country;
        document.querySelector(".card").style.display = "flex";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener('click', ()=> {
    let city = searchBar.value;
    weatherInfo(city);
})


function getLocation(){
    navigator.geolocation.getCurrentPosition(getLocation,error);
    async function getLocation(position){
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        async function gLocation(){
            const response = await fetch(apiUrl + `lat=${lat}&lon=${lon}` +`&appid=${apiKey}`);  
            if (response.status == 404) {
              console.log("Failed to get");
            } 
            else {
                let data = await response.json();
                document.querySelector(".left-upper #left-city").innerHTML =
                data.name;
                document.querySelector(".left-upper #left-country").innerHTML =
                data.sys.country;
                document.querySelector(".left-bottom #left-temp").innerHTML =
                Math.round(data.main.temp) + "°C";
                let bg = document.querySelector(".left");
                switch (data.weather[0].icon) {
                    case "01d":
                    case "01n":
                        bg.style.backgroundImage = "url(Images&Icons/clear-bg.gif)";
                        bg.style.color = "#000";
                    break;
                    case "02d":
                    case "02n":
                    case "03d":
                    case "03n":
                    case "04d":
                    case "04n":
                        bg.style.backgroundImage = "url(Images&Icons/cloud-bg.gif)";
                        bg.style.color = "#fff";
                    break;
                    case "09d":
                    case "09n":
                    case "10d":
                    case "10n":
                        bg.style.backgroundImage = "url(Images&Icons/rain-bg.gif)";
                        bg.style.color = "#000";
                    break;
                    case "11d":
                    case "11n":
                        bg.style.backgroundImage = "url(Images&Icons/thunderstorm-bg.gif)";
                        bg.style.color = "#000";
                    break;
                    case "13d":
                    case "13n":
                        bg.style.backgroundImage = "url(Images&Icons/snow-bg.gif)";
                        bg.style.color = "#000";
                    break;
                    case "50d":
                    case "50n":
                        bg.style.backgroundImage = "url(Images&Icons/mist-bg.gif)";
                        bg.style.color = "#000";
                    break;
                    default:
                        bg.style.backgroundImage = "none";
                        bg.style.color = "#fff";
                }
            }

        }
        gLocation();
        setInterval(() => {
            const time = new Date().toLocaleTimeString([],{hour : '2-digit',minute : '2-digit' , second : '2-digit', hour12 : true}).toLowerCase();
            document.querySelector(".left-bottom #time").innerHTML = time;
            const date = new Date();
            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const today = day + "," + date.getDate() + "-" + month + "-" + date.getFullYear();
            document.querySelector(".left-bottom #today").innerHTML = today;
        }, 1000);
        document.querySelector(".left-cover").style.display = "none";
    }
    async function error(){
        console.log("Error...! couldn't get location");
    }
}

getLocation();




/*Url:
https://api.openweathermap.org/data/2.5/weather?q=Ajmer&appid=6f91af6659e7ff593706d48284a1f61e&units=metric*/