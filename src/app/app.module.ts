import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { RoundPipe } from './pipes/round.pipe';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavbarComponent } from './components/static/navbar/navbar.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { FiveDaysForecastComponent } from './components/weather-details/five-days-forecast/five-days-forecast.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { FavoriteButtonComponent } from './components/buttons/favorite-button/favorite-button.component';
import { ToggleCelsiusButtonComponent } from './components/buttons/toggle-celsius-button/toggle-celsius-button.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducer as UserReducer } from './reducers/user.reducer';
import { reducer as WeatherReducer } from './reducers/weather.reducer';
import { reducer as FavoritesReducer } from './reducers/favorites.reducer';
import { ToastrModule } from 'ngx-toastr';

const components = [
  AppComponent,
  WeatherComponent,
  WeatherDetailsComponent,
  FiveDaysForecastComponent,
  FavoriteButtonComponent,
  ToggleCelsiusButtonComponent,
  SearchBarComponent,
  NavbarComponent,
  FavoritesComponent,
  FavoritesListComponent
]

const directives = [
  ClickOutsideDirective
]

const pipes = [
  RoundPipe
]

const modules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ToastrModule.forRoot({
    preventDuplicates: true
  }), // ToastrModule added
  StoreModule.forRoot({
    user: UserReducer,
    weather: WeatherReducer,
    favorites: FavoritesReducer
  })
]

@NgModule({
  declarations: [components, directives, pipes],
  imports: [modules],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
