import { FutureForecast } from './../models/weather-interfaces';
import { Weather } from '../models/weather-interfaces';
import * as WeatherActions from '../actions/weather.action';

const initialState: Weather = null

export function reducer(state: Weather = initialState, action: WeatherActions.Actions) {
    switch (action.type) {
        case WeatherActions.SET_WEATHER:
            return action.payload;
        case WeatherActions.SET_FIVE_DAYS_FORECAST:
            return {
                ...state,
                fiveDaysForecast: action.payload
            }
        default:
            return state;
    }
}
