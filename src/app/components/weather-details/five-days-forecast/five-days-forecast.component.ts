import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Weather } from './../../../models/weather-interfaces';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.scss']
})
export class FiveDaysForecastComponent {

  @Input('weather') weather$: Observable<Weather>;
  public weatherStore: Observable<Weather>;
}
