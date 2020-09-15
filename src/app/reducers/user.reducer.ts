import { User } from './../models/user';
import * as UserActions from '../actions/user.action';

const initialState: User =
    JSON.parse(localStorage.getItem('userStore')) || <User>{
        isCelsius: true
    }

export function reducer(state: User = initialState, action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.TOGGLE_CELSIUS:
            return {
                ...state,
                isCelsius: !state.isCelsius
            };
        default:
            return state;
    }
}