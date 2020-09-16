import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of, interval } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { WeatherService } from './../../services/weather.service';
import { WeatherKey, Weather } from './../../models/weather-interfaces';
import { debounce, delay, takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements  OnDestroy, AfterViewInit {

  public user$: Observable<User>

  @Input('favorites') favorites$: Observable<WeatherKey[]>
  private favoritesSubscriber: Subscription
  public favoritesFetchedWeathers: Weather[] = [];

  constructor(
    private weatherService: WeatherService,
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = this.userService.userStore
  }

  ngAfterViewInit() {
    this.user$.pipe(debounce(() => interval(200))).subscribe(user => {
      if (user.hasOwnProperty('isOutOfApiCalls')) {
        this.favorites$ && this.fetchAllFavorites()
      }
    })
  }

  ngOnDestroy(): void {
    this.favoritesSubscriber && this.favoritesSubscriber.unsubscribe();
  }

  private fetchAllFavorites() {
    this.favoritesFetchedWeathers = []
    this.favoritesSubscriber = this.favorites$.subscribe((weatherKeys: WeatherKey[]) => {
      for (const wk of weatherKeys) {
        this.weatherService.getWeather(wk).subscribe(weather =>
          this.favoritesFetchedWeathers.push(weather))
      }
    })
    return of(this.favoritesFetchedWeathers)
  }

  goToWeather(weatherKey: WeatherKey) {
    this.weatherService.setWeatherToStore(weatherKey)
    this.router.navigate(['']);
  }

  getWeatherKey = (key, localizedName) => <WeatherKey>{ key, localizedName }

}
