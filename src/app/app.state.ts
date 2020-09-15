import { User } from './models/user';
import { Weather, WeatherKey } from './models/weather-interfaces';

export interface AppState {
    readonly user: User
    readonly weather: Weather
    readonly favorites: WeatherKey[]
}