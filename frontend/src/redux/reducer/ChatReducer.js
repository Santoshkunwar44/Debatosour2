import { ActionTypes } from "../action/actionTypes/ActionTypes";




const INTIAL_CHATSTATE = {
    setMessage:null,
    
}

const ChatReducer = (state = INTIAL_CHATSTATE, action) => {

    switch (action.type) {
        case ActionTypes.SET_MESSAGE_ARR:
            return { ...state, setMessage: action.payload }


        default:
            return state
    }



}

export default ChatReducer;