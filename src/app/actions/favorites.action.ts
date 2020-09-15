import { Action } from '@ngrx/store';
import { WeatherKey } from './../models/weather-interfaces';

export const ADD_FAVORITE = "[FAVORITS] Add"

export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE
    constructor(public payload: WeatherKey) { }
}

export const REMOVE_FAVORITE = "[FAVORITS] Remove"

export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE
    constructor(public payload: WeatherKey) { }
}

export type Actions = AddFavorite | RemoveFavorite