import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Weather, WeatherKey } from '../../models/weather-interfaces';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailsComponent {

  @Input('weather') weather$: Observable<Weather>;
  public user$: Observable<User>

  constructor(private userService: UserService) {
    this.user$ = this.userService.userStore
  }

  getWeatherKey = (key, localizedName) => <WeatherKey>{ key, localizedName }

}

