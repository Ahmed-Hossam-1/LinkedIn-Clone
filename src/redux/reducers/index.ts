import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userState: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
