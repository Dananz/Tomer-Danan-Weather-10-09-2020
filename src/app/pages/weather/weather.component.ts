import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { WeatherService } from './../../services/weather.service';
import { Weather, WeatherKey } from './../../models/weather-interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  public weather$: Observable<Weather>

  constructor(
    private store: Store<AppState>,
    private weatherService: WeatherService
  ) {
    this.weather$ = this.store.select('weather')
  }

  selectWeather(key: WeatherKey): void {
    this.weatherService.setWeatherToStore(key);
  }

}
