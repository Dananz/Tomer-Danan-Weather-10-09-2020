import { User } from './../models/user';
import * as UserActions from '../actions/user.action';

const initialLSValue = {
    ...<User>JSON.parse(localStorage.getItem('userStore')),
    isOutOfApiCalls: false
}
const initialState: User = initialLSValue || <User>{ isCelsius: true }

export function reducer(state: User = initialState, action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.TOGGLE_CELSIUS:
            return {
                ...state,
                isCelsius: !state.isCelsius
            }
        case UserActions.TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            }
        case UserActions.SET_OUT_OF_API_CALLS:
            return {
                ...state,
                isOutOfApiCalls: true
            }
        default:
            return state;
    }
}