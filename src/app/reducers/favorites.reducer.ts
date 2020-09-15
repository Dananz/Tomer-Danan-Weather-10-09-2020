import { WeatherKey } from '../models/weather-interfaces';
import * as FavoritesActions from '../actions/favorites.action';

const initialState: WeatherKey[] =
    JSON.parse(localStorage.getItem('favoritesStore')) || [<WeatherKey>{
        key: "215854",
        localizedName: "Tel Aviv"
    }]

export function reducer(state: WeatherKey[] = initialState, action: FavoritesActions.Actions) {
    switch (action.type) {
        case FavoritesActions.ADD_FAVORITE:
            return [...state, action.payload];
        case FavoritesActions.REMOVE_FAVORITE:
            return state.filter(s => s.key !== action.payload.key);
        default:
            return state;
    }
}