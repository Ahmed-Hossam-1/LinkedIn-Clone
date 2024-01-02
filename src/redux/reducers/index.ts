import { combineReducers } from "redux";
import userReducer from "./userReducer";
import articalReducer from "./ArticalReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articalState: articalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
