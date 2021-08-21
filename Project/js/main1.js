function checkWeather(){
  let temperature = document.getElementById("temperature");
  let location = document.getElementById("location");
  let description = document.getElementById("description");
  let icon = document.querySelector(".icon");

  
  navigator.geolocation.getCurrentPosition(success, error);
  
  function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={APIKEY}`;
    
    fetch(weather)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp
        temperature.innerHTML = Math.round(temp - 273.15) + "°C";
        location.innerHTML = data.name + "," + data.sys.country;
        description.innerHTML = data.weather[0].main;
        let icons = data.weather[0].icon;
        icon.innerHTML = `<img src="icons/${icons}.svg" style= 'height:10rem'/>`;
      });
  }

  function error(){
    location.innerHTML = "Unable to retrieve location";
  }
}

checkWeather();
