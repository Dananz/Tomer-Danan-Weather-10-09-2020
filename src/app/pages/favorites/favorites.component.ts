import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherKey } from './../../models/weather-interfaces';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  public favorites$: Observable<WeatherKey[]>

  constructor(
    private store: Store<AppState>
  ) {
    this.favorites$ = this.store.select('favorites')
  }

}
