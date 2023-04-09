import { combineReducers } from "redux"
import DebateReducer from "./DebateReducer";
import OtherReducer from "./OtherReducer";
import UserReducer from "./UserReducer"

const reducers = combineReducers({
    user: UserReducer,
    other: OtherReducer,
    debate: DebateReducer
})
export default reducers;



