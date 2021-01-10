class WeatherAPI {
  constructor() {
    this.msg = document.getElementById("msg");
    this.rainFreeHours = [];
    this.request = this.getWeatherData();
    this.currentTime = this.getTime();
    this.sunArray = [];
  }
  
  //fetch request
  async getWeatherData() {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&appid=889db4cd2682f3f9047e5bfe087fc6d4"
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      this.checkForRain(data.hourly);
      this.getSunriseAndSet(data.daily);
    } catch (err) {
      alert(err);
    }
  }
  //get sunrise and sunset -> converts from unix to gmt
  getSunriseAndSet(dailyData) {
    let unixSunrise = dailyData[0].sunrise;
    let sunriseHours = new Date(unixSunrise * 1000).getHours();
    let sunriseMins = new Date(unixSunrise * 1000).getMinutes();
    let unixSunset = dailyData[0].sunset;
    let sunsetHours = new Date(unixSunset * 1000).getHours();
    let sunsetMins = new Date(unixSunset * 1000).getMinutes();
    this.sunArray = [
      (sunriseHours * 100 + sunriseMins) / 100,
      (sunsetHours * 100 + sunsetMins) / 100,
    ];
    this.giveOptions(this.rainFreeHours, this.sunArray);
  }

  //loops through hourly data to find when there's rain
  checkForRain(hourlyData) {
    for (let i = 0; i <= 11; i++) {
      let timeInLoop =
        this.currentTime + i <= 24
          ? this.currentTime + i
          : this.currentTime + i - 24;
      if (hourlyData[i].weather[0].main != "Rain") {
        this.rainFreeHours.push(timeInLoop);
      }
    }
  }
  //gets the current hour and mins
  getTime() {
    const date = new Date();
    const currentTime = date.getHours();
    return currentTime;
  }

  // writes out the message depending on 
  giveOptions(rainFreeHours, sunArray) {
    let perfectHours = [];
    rainFreeHours.forEach((hour) => {
      if (hour > sunArray[0] && hour < sunArray[1]) {
        console.log(hour);
        perfectHours.push(hour);
        // console.log(perfectHours);
      }
    });

    if (perfectHours.length > 0) {
      this.msg.innerHTML = `It's not raining and it's light at ${this.format(perfectHours)}`;
    } else if (rainFreeHours.length > 0) {
      this.msg.innerHTML = `It's not raining at ${this.format(rainFreeHours)} but it'll be dark...`;
    } else {
      this.msg.innerHTML = "It's raining for the next 12 hours!";
    }
  }

  format(hoursArray){
    let formattedArray = hoursArray.map( hour =>{
      if (hour > 12) {
        hour -= 12;
        hour = " " + hour;
        hour += "PM";
      }
      if (hour <= 12) {
        hour = " " + hour;
        hour += "AM";
      }
      return hour;
    })
    formattedArray.splice(formattedArray.length - 1, 0, " or")
    let newString = formattedArray.toString().replace("or,", "or");
    return newString;
  }
}

new WeatherAPI();


