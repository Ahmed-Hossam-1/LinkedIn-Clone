// import firebase from "firebase/compat/app";
import Actions from "../actions/actionsType";

interface TInitialState {
  user: any;
}

const initialState: TInitialState = {
  user: null,
};

export interface SignInAction {
  type: Actions.SET_USER;
  payload: any;
}

type TAction = SignInAction;

const userReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
