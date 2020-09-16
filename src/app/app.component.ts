import { ThemeService } from './services/theme.service';
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
    private locationService: LocationService,
    private theme: ThemeService
  ) {
    this.setLocationWeather();
    if(this.theme.isDarkModeEnabled) {
      this.theme.toggleDarkMode();

    }
    
  }

  public async setLocationWeather() {
    await this.locationService.getPosition()
      .then(coords =>
        this.weatherService.getCoordsLocationWeather(coords)
          .subscribe(locationWeatherKey =>
            locationWeatherKey && this.weatherService.setWeatherToStore(locationWeatherKey)
          ))

      .catch(err =>
        // When no agreement for geolocation, uses local Tel Aviv key.
        this.weatherService.setDefaultWeatherToStore()
      )
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
