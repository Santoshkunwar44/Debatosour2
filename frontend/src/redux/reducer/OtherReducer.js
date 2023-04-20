import { ActionTypes } from "../action/actionTypes/ActionTypes"


const INITIAL_OTHER_STATE = {
    toastRef: null,
    isLoading: false,
    refresh: false,

}

const OtherReducer = (state = INITIAL_OTHER_STATE, action) => {

    switch (action.type) {

        case ActionTypes.ADD_TOAST_REF:
            return { ...state, toastRef: action.payload }
        case ActionTypes.SET_IS_LOADING:
            return { ...state, isLoading: true }
        case ActionTypes.SET_IS_NOT_LOADING:
            return { ...state, isLoading: false }

        case ActionTypes.SET_REFRESH:
            return { ...state, refresh: !state.refresh }

        default:
            return INITIAL_OTHER_STATE
    }



}

export default OtherReducer;