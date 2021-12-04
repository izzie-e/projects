import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  
  constructor() {
  }

  async getData(coords: number[]) : Promise<number[] []> {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&appid=889db4cd2682f3f9047e5bfe087fc6d4`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      const data = await response.json();
      
      //returns an array with the hours of sunset and sunrise
      let sunArray = this.getSunriseAndSet(data.daily);
      //returns an array with the hours have rain
      let rainHoursArray = this.checkForRain(data.hourly);
      //returns an arrar of light & rain free hours
      let perfectHoursArray = this.getPerfectHours(rainHoursArray,sunArray);

      return [
        sunArray,
        rainHoursArray,
        perfectHoursArray
      ]
 
    } catch (err) {
      alert(err);
    }
    return [];
  }

  //get sunrise and sunset -> converts from unix to gmt
  getSunriseAndSet(dailyData: { sunset: number, sunrise : number }[]) {
    let unixSunrise = dailyData[0].sunrise;
    let sunriseHours = new Date(unixSunrise * 1000).getHours();
    let sunriseMins = new Date(unixSunrise * 1000).getMinutes();
    let unixSunset = dailyData[0].sunset;
    let sunsetHours = new Date(unixSunset * 1000).getHours();
    let sunsetMins = new Date(unixSunset * 1000).getMinutes();
    let sunArray = [
      (sunriseHours * 100 + sunriseMins) / 100,
      (sunsetHours * 100 + sunsetMins) / 100,
    ];
    return sunArray;
  }

  //loops through hourly data to find when there's rain
  checkForRain(hourlyData: { weather: { main: string; }[]; }[]) {
    let currentTime = new Date().getHours();
    let rainHours: number [] = [];
    for (let i = 0; i <= 24 - currentTime; i++) {
      let timeInLoop =
        currentTime + i <= 24
          ? currentTime + i
          : currentTime + i - 24;
      if (hourlyData[i].weather[0].main == "Rain") {
        rainHours.push(timeInLoop);
      }
    }
    return rainHours;
  }
  
   //selects the hours which are light and free of rain
   getPerfectHours(rainHoursArray: number[], sunArray: number [] ) {
     let perfectHours : number [] = [];
     let rainFreeHoursArray : number [] = [];
     for (let i= new Date().getHours(); i<=24; i++) {
       rainFreeHoursArray.push(i);
     }
    rainFreeHoursArray.forEach((hour: number) => {
      if (hour > sunArray[0] && hour < sunArray[1]) {
        perfectHours.push(hour);
      }
    });
    return perfectHours;
  }



}
