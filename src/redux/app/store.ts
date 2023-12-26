import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
export type Dispatch = typeof store.dispatch;

export default store;
