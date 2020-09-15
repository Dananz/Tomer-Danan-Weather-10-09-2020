import { Action } from '@ngrx/store';
import { Weather, FutureForecast } from '../models/weather-interfaces';

export const SET_WEATHER = "[WEATHER] Set"
export const SET_FIVE_DAYS_FORECAST = "[WEATHER] Set Five Days Forecast"

export class SetWeather implements Action {
    readonly type = SET_WEATHER
    constructor(public payload: Weather) { }
}

export class SetFiveDaysForecast implements Action {
    readonly type = SET_FIVE_DAYS_FORECAST
    constructor(public payload: FutureForecast[]) { }
}

export type Actions = SetWeather | SetFiveDaysForecast