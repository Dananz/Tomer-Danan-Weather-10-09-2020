import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './../pages/favorites/favorites.component';
import { WeatherComponent } from './../pages/weather/weather.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WeatherComponent },
  { path: 'favorites', component: FavoritesComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
