import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from './../../../services/weather.service';
import { WeatherKey } from './../../../models/weather-interfaces';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-toggle-celsius-button',
  templateUrl: './toggle-celsius-button.component.html',
  styleUrls: ['./toggle-celsius-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleCelsiusButtonComponent {

  public user$: Observable<User>
  @Input('weatherKey') weatherKey?: WeatherKey

  constructor(
    private userService: UserService,
    private weatherService: WeatherService
  ) {
    this.user$ = this.userService.userStore
  }

  toggleCelsius = () => {
    this.userService.toggleCelsius()
    this.weatherKey && this.weatherService.setFiveDaysForecastToStore(this.weatherKey)
  }
}
