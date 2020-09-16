import { WeatherService } from './weather.service';
import { WeatherKey } from './../models/weather-interfaces';
import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as UserActions from '../actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userStore: Observable<User>

  constructor(private store: Store<AppState>) {
    this.userStore = this.store.select('user')
  }

  public toggleCelsius() {
    this.store.dispatch(new UserActions.ToggleCelsius())
    this.userStore.subscribe(store => this.updateLocalStorage(store))
  }

  public toggleDarkModeAtStore() {
    this.store.dispatch(new UserActions.ToggleDarkMode())
    this.userStore.subscribe(store => this.updateLocalStorage(store))
  }

  public setOutOfApiCalls() {
    this.store.dispatch(new UserActions.SetOutOfApiCalls())
  }

  updateLocalStorage(store) {
    if (!store) return
    localStorage.setItem('userStore', JSON.stringify(store))
  }

  getWeatherKey = (key, localizedName) => <WeatherKey>{ key, localizedName }

}
