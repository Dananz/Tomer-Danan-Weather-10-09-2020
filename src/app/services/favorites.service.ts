import { WeatherKey } from '../models/weather-interfaces';
import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../actions/favorites.action';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favoritesStore: Observable<WeatherKey[]>

  constructor(private store: Store<AppState>) {
    this.favoritesStore = this.store.select('favorites')
  }

  addFavorite(key: WeatherKey) {
    if (key['key'] && key['localizedName']) {
      this.store.dispatch(new FavoritesActions.AddFavorite(key))
      this.favoritesStore.subscribe(store => this.updateLocalStorage(store))
    }
  }

  removeFavorite(key: WeatherKey) {
    if (key['key'] && key['localizedName']) {
      this.store.dispatch(new FavoritesActions.RemoveFavorite(key))
      this.favoritesStore.subscribe(store => this.updateLocalStorage(store))
    }
  }

  isExists(key: string) {
    if (!key) return
    return of(this.favoritesStore.subscribe(state => state.find(w => w.key === key) ? true : false))
  }

  updateLocalStorage(store) {
    if (!store) return
    localStorage.setItem('favoritesStore', JSON.stringify(store))
  }
}
