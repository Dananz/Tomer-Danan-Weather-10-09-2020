import { User } from './../models/user';
import { errorNotifyService } from './notification.service';
import { UserService } from 'src/app/services/user.service';
import { Weather } from './../models/weather-interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from './../../environments/environment'
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccuWeatherApiService {

  public user: User;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private notifyService: errorNotifyService
  ) {
    this.userService.userStore.subscribe(user => this.user = user)
  }

  public getLocationWeather(coords: []) {
    if (this.user.isOutOfApiCalls|| !env.production) {
      return this.http.get('../../assets/json/location-weather.json')
    }
    return this.http.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${env.API_KEY}&q=${coords}`)
      .pipe(catchError(async (err) => this.notifyService.showError(err)))
  }

  public getCurrentWeather(key: string) {
    if (this.user.isOutOfApiCalls || !env.production) {
      return this.http.get<Weather>('../../assets/json/ashdod-weather.json')
    }
    return this.http.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${env.API_KEY}`)
      .pipe(catchError(async (err) => this.notifyService.showError(err)))
  }

  public getFiveDailyForecast(key: string) {
    let isCelcius: boolean
    this.userService.userStore.subscribe(user => isCelcius = user.isCelsius)

    if (this.user.isOutOfApiCalls || !env.production) {
      return this.http.get('../../assets/json/five-days-ashdod.json')
    }
    return this.http.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${env.API_KEY}&metric=${isCelcius} `)
      .pipe(catchError(async (err) => this.notifyService.showError(err)))
  }

  public getAutocompleteSearch(searchValue: string) {
    if (this.user.isOutOfApiCalls || !env.production) {
      return this.http.get('../../assets/json/auto-complete.json')
    }
    return this.http.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${env.API_KEY}&q=${searchValue}`)
      .pipe(catchError(async (err) => this.notifyService.showError(err)))
  }

}
