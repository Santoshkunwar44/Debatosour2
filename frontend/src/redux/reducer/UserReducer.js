import { ActionTypes } from "../action/actionTypes/ActionTypes";

const INITIAL_USERSTATE = {
  data: null,
};

const UserReducer = (state = INITIAL_USERSTATE, action) => {
  switch (action.type) {
    case ActionTypes.ADDUSER:
      console.log("*pay: ", action.payload);
      return { ...state, data: action.payload };

    case ActionTypes.REMOVEUSER:
      return { ...state, data: null };

    default:
      return state;
  }
};

export default UserReducer;
