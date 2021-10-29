class WeatherAPI {
  constructor() {
    this.msg = document.getElementById("msg");
    this.colorKey = document.getElementById("colorKey");
    this.colorKey.style.display = "none";
    this.init = this.getUserLocation();
    this.rainFreeHours = [];
    this.perfectHours = [];
    this.currentTime = this.getTime();
    this.sunArray = [];
  }
  //method that takes callback functions as parameters depending on success or not
  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      this.successFunction,
      this.failureFunction
    );
  }

  successFunction = (position) => {
    this.getWeatherData([position.coords.latitude, position.coords.longitude]);
  };

  failureFunction = () => {
    this.msg.innerHTML = "We can't access your location data! Make sure that location services are enabled on whichever browser you're using!";
  };

  //fetch request for weather data
  async getWeatherData(coords) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&appid=889db4cd2682f3f9047e5bfe087fc6d4`
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
    this.getPerfectHours();
    this.drawToday();
  }

  //loops through hourly data to find when there's rain
  checkForRain(hourlyData) {
    for (let i = 0; i <= 24 - this.currentTime; i++) {
      let timeInLoop =
        this.currentTime + i <= 24
          ? this.currentTime + i
          : this.currentTime + i - 24;
      if (hourlyData[i].weather[0].main != "Rain") {
        this.rainFreeHours.push(timeInLoop);
      }
    }
  }
  
  //selects the hours which are light and free of rain
  getPerfectHours() {
    this.rainFreeHours.forEach((hour) => {
      if (hour > this.sunArray[0] && hour < this.sunArray[1]) {
        this.perfectHours.push(hour);
      }
    });
  }

  //gets the current hour and mins
  getTime() {
    const date = new Date();
    const currentTime = date.getHours();
    return currentTime;
  }

  drawToday() {
    this.colorKey.style.display = "flex";
    let table = document.getElementById("table");
    let hoursToBeDisplayed = 24 - this.currentTime;
    for (let i = 0; i <= hoursToBeDisplayed; i++) {
      let currentRow = table.insertRow(i);
      let currentCell = currentRow.insertCell(0);
      let hour = this.currentTime + i;
      let suffix = "AM";
      if (hour > 12 && hour < 24) {
        hour -= 12;
        suffix = "PM";
      } else if (hour == 12 || hour == 24) {
        hour = hour == 12 ? "Noon" : "Midnight";
        suffix = "";
      }
      currentCell.innerHTML = `${hour} ${suffix}`;
      currentCell.style.backgroundColor = "#118ab2"; //blue
      this.selectBackground(
        this.rainFreeHours,
        this.currentTime + i,
        "#e0e1dd", //gray
        currentCell
      );
      this.selectBackground(
        this.perfectHours,
        this.currentTime + i,
        "#ffd166", //yellow
        currentCell
      );
    }
  }

  selectBackground = (hoursToBeChecked, currentTime, color, currentCell) => {
    hoursToBeChecked.map((hourToBeChecked) => {
      if (currentTime == hourToBeChecked) {
        currentCell.style.backgroundColor = color.toString();
      }
    });
  };
}

new WeatherAPI();
