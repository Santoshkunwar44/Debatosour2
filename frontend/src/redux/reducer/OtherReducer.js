import { ActionTypes } from "../action/actionTypes/ActionTypes"


const INITIAL_OTHER_STATE = {
    rtmChannel:null,
    toastRef: null,
    isLoading: false,
    refresh: false,
    removeInterval:null,
    rtmChannel:null,

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
         case ActionTypes.SET_REMOVE_INTERVAL_FUNC:

               return { ...state,   removeInterval : action.payload}

        case ActionTypes.SET_RTM_CHANNEL:
            console.log('settingRtm',action.payload)
            return {...state, rtmChannel:action.payload} 

        default:
            return INITIAL_OTHER_STATE
    }



}

export default OtherReducer;