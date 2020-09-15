import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherKey } from './../../../models/weather-interfaces';
import { FavoritesService } from './../../../services/favorites.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: `./favorite-button.component.html`,
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {

  @Input('size') size: 'small' | 'large'
  @Input('weatherKey') weatherKey: WeatherKey
  private isExistsSubscription: Subscription
  public active = false;

  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    this.isExistsSubscription = this.favoritesService.favoritesStore.subscribe(store => {
      this.active = store?.find(w => w.key === this.weatherKey.key) ? true : false
    })
  }

  ngOnDestroy() {
    this.isExistsSubscription && this.isExistsSubscription.unsubscribe()
  }

  toggleFavorites(ev: Event): void {
    ev.stopPropagation()
    this.active ?
      this.favoritesService.removeFavorite(this.weatherKey) :
      this.favoritesService.addFavorite(this.weatherKey)
  }
}
