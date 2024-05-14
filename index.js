const weatherform= document.querySelector(".weatherform")
const cityinput=document.querySelector(".cityinput")
const card=document.querySelector(".card")
const apikey="d8616d8b0bc434aa7a21b5d774938516"

weatherform.addEventListener("submit", async event=>{

    event.preventDefault()

    const city=cityinput.value;

    if(city){
        try{
            const weatherData= await getweatherData(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displayerror(error)
        }
    }
    else{
        displayerror("Please Enter a City")
    }
});


async function getweatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response= await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather Data")
    }

    return await response.json();
}

function displayweatherInfo(data){
    const{
        name:city,
        main:{temp,humidity},
        weather:[{description, id}]} =data;

        card.textContent="";
        card.style.display="flex";

        const citydisplay=document.createElement("h1");
        const tempdisplay=document.createElement("p");
        const humdisplay=document.createElement("p");
        const descdisplay=document.createElement("p");
        const weatherdisplay=document.createElement("p");

        citydisplay.textContent=city;
        tempdisplay.textContent=`${((temp- 273.15)* (9/5) + 32).toFixed(1)} ^ F`;
        humdisplay.textContent=`Humidity: ${humidity}%`;
        descdisplay.textContent=description;
        weatherdisplay.textContent=getweatherEmoji(id);

        citydisplay.classList.add("citydisplay");
        tempdisplay.classList.add("tempdisplay");
        humdisplay.classList.add("humdisplay");
        descdisplay.classList.add("descdisplay");
        weatherdisplay.classList.add("weatherdisplay");

        card.appendChild(citydisplay);
        card.appendChild(tempdisplay);
        card.appendChild(humdisplay);
        card.appendChild(descdisplay);
        card.appendChild(weatherdisplay);
}


function getweatherEmoji(weatherId){

    switch(true){
        case(weatherId>=200 && weatherId<232):
        return "🌧️";
        case(weatherId>=300 && weatherId<321):
        return "🌧️";
        case(weatherId>=500 && weatherId<531):
        return "🌧️";
        case(weatherId>=600 && weatherId<622):
        return "❄️";
        case(weatherId>=701 && weatherId<781):
        return "༄";
        case(weatherId === 800):
        return "🌤️";
        case(weatherId>=801 && weatherId<804):
        return "☁";
        default:
            return "❓";
    }
}

function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);

}