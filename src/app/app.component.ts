import { Component } from '@angular/core';
import { WeatherKey } from './models/weather-interfaces';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {
    this.setLocationWeather();
  }

  public async setLocationWeather() {
    await this.locationService.getPosition()

      .then(coords =>
        this.weatherService.getLocationWeather(coords)
          .subscribe(locationWeatherKey =>
            this.weatherService.setWeatherToStore(locationWeatherKey)))

      .catch(err =>
        this.weatherService.setWeatherToStore(<WeatherKey>{
          key: "215854",
          localizedName: "Tel Aviv"
        }))
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
