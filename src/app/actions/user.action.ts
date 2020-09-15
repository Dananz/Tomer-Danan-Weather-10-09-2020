import { Action } from '@ngrx/store';
import { User } from './../models/user';

export const TOGGLE_CELSIUS = "[USER] Toggle Celsius"

export class ToggleCelsius implements Action {
    readonly type = TOGGLE_CELSIUS
    constructor() { }
}

export type Actions = ToggleCelsius