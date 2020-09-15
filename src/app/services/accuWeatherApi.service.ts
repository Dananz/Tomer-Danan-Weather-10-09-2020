import { UserService } from 'src/app/services/user.service';
import { Weather } from './../models/weather-interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from './../../environments/environment'

const turnoff = false

@Injectable({
  providedIn: 'root'
})
export class AccuWeatherApiService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public getLocationWeather(coords: []) {
    return turnoff || env.production ?
      this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${env.API_KEY}&q=${coords}`) :
      this.http.get('../../assets/json/location-weather.json')
  }

  public getCurrentWeather(key: string) {
    return turnoff || env.production ?
      this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${env.API_KEY}`) :
      this.http.get<Weather>('../../assets/json/ashdod-weather.json')
  }

  public getFiveDailyForecast(key: string) {
    let isCelcius: boolean
    this.userService.userStore.subscribe(user => isCelcius = user.isCelsius)

    return turnoff || env.production ?
      this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${env.API_KEY}&metric=${isCelcius} `) :
      this.http.get('../../assets/json/five-days-ashdod.json')
  }

  public getAutocompleteSearch(searchValue: string) {
    return turnoff || env.production ?
      this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${env.API_KEY}&q=${searchValue}`) :
      this.http.get('../../assets/json/auto-complete.json')
  }

}
