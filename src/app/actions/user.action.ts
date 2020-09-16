import { Action } from '@ngrx/store';
import { User } from './../models/user';

export const TOGGLE_CELSIUS = "[USER] Toggle Celsius"
export class ToggleCelsius implements Action {
    readonly type = TOGGLE_CELSIUS
}

export const TOGGLE_DARK_MODE = "[USER] Toggle Darkmode"
export class ToggleDarkMode implements Action {
    readonly type = TOGGLE_DARK_MODE
}

export const SET_OUT_OF_API_CALLS = "[USER] Set outOfApiCalls"
export class SetOutOfApiCalls implements Action {
    readonly type = SET_OUT_OF_API_CALLS
}

export type Actions = ToggleCelsius | ToggleDarkMode | SetOutOfApiCalls