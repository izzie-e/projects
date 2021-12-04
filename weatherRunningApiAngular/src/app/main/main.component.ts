import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators'

import {GeolocationService} from '@ng-web-apis/geolocation';
import {WeatherService} from 'src/app/services/weather.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  show:boolean = false;
  displayHours : number [] = this.getDisplayHours();
  sunArray : number [] = [];
  rainHoursArray : number [] = [];
  perfectHoursArray : number [] = [];
  savedHours : number [] = [];

  constructor(private readonly geolocation$: GeolocationService, private weather: WeatherService) {
  }

  ngOnInit(): void {
    this.getWeatherData();  
  }
  saveHour(hour: number) : void {
    this.savedHours.push(hour);
  }

  getDisplayHours() : number [] {
    let startfrom: number = new Date().getHours();
    let arr : number [] = [];
    for (let i=startfrom; i<=24; i++)
    {
      arr.push(i);
    }
    return arr;
  }

  getColor(hour: number) : string {
    let color!: string;
    //check through dark first
    if (hour < this.sunArray[0] || hour > this.sunArray[1]) {
      color = "#e0e1dd";
    }
    // do a for loop to add rain
    for (let i=0; i< this.rainHoursArray.length; i++) {
      if (this.rainHoursArray[i] == hour) {
        color= "#118ab2"
      }
    }
    // then add perfect
    for (let i=0; i< this.perfectHoursArray.length; i++) {
      if (this.perfectHoursArray[i] == hour) {
        color= "#ffd166"
      }
    }
    return color;
  }

   getWeatherData() : void {
    // abstracted web service api for geolocation 
    this.geolocation$.pipe(take(1)).subscribe(position => {
    this.weather.getData([position.coords.latitude, position.coords.longitude]).then( r =>{
       // destructuring returned array
        let [sunArray, rainHoursArray, perfectHoursArray] = r;
        this.sunArray = sunArray;
        this.rainHoursArray = rainHoursArray;
        this.perfectHoursArray = perfectHoursArray;

        //make the display able to be seen
        this.show = true;

        
      })
    });
  }
}
