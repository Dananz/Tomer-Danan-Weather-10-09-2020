
import { Weather, WeatherKey, FutureForecast } from './../models/weather-interfaces';
import { AccuWeatherApiService } from './accuWeatherApi.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as WeatherActions from './../actions/weather.action'


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private accuWeatherService: AccuWeatherApiService,
    private store: Store<AppState>
  ) { }

  /**
   * Uses Tel Aviv `key` && `localizedName` to set default weather to store.
   */
  public setDefaultWeatherToStore(): void {
    this.setWeatherToStore({ key: "215854", localizedName: "Tel Aviv" });
  }

  public getCoordsLocationWeather(coords: []): Observable<WeatherKey> {
    return this.accuWeatherService.getLocationWeather(coords)
      .pipe(
        map(result => result && <WeatherKey>{
          key: result['Key'],
          localizedName: result['LocalizedName'],
        }))
  }

  public setWeatherToStore(weatherKey: WeatherKey): void {
    this.getWeather(weatherKey)
      .subscribe(weatherResponse => {
        this.store.dispatch(new WeatherActions.SetWeather(<Weather>weatherResponse))

        this.getFiveForecasts(weatherKey).subscribe(weatherForecast =>
          this.store.dispatch(new WeatherActions.SetFiveDaysForecast(weatherForecast)))
      })
  }

  public setFiveDaysForecastToStore(weatherKey: WeatherKey) {
    return this.getFiveForecasts(weatherKey).subscribe(weatherForecast => {
      this.store.dispatch(new WeatherActions.SetFiveDaysForecast(weatherForecast))
    })
  }

  public getWeather(key: WeatherKey): Observable<Weather> {
    return this.accuWeatherService.getCurrentWeather(key?.key)
      .pipe(
        map(result => result[0]),
        map((result: any) => {
          const weather: Weather = {
            key: result['Key'] || key?.key,
            localizedName: result['LocalizedName'] || key?.localizedName,
            isDayTime: result['IsDayTime'],
            localObservationDateTime: result['LocalObservationDateTime'],
            link: result['Link'],
            weatherText: result['WeatherText'],
            weatherIcon: result['WeatherIcon'],
            temperature: {
              metric: {
                value: result['Temperature']['Metric']['Value'],
                unit: result['Temperature']['Metric']['Unit']
              },
              imperial: {
                value: result['Temperature']['Imperial']['Value'],
                unit: result['Temperature']['Imperial']['Unit']
              }
            }
          }
          return weather
        }))
  }

  public getFiveForecasts(key: WeatherKey): Observable<FutureForecast[]> {
    return this.accuWeatherService.getFiveDailyForecast(key?.key)
      .pipe(
        map(result => result['DailyForecasts']),
        map((result: any[]) => {
          const forecast: FutureForecast[] = []
          for (const resItem of result) {
            forecast.push(<FutureForecast>{
              date: resItem['Date'],
              temperature: {
                min: {
                  value: resItem['Temperature']['Minimum']['Value'],
                  unit: resItem['Temperature']['Minimum']['Unit']
                },
                max: {
                  value: resItem['Temperature']['Maximum']['Value'],
                  unit: resItem['Temperature']['Maximum']['Unit']
                },
              },
              dayIcon: resItem['Day']['Icon'],
              nightIcon: resItem['Night']['Icon'],
            })
          }
          return forecast
        })
      )
  }


}
