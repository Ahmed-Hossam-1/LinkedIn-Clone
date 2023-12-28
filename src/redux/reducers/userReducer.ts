import Actions from "../actions/actionsType";

export type TUser = {
  email: string;
  displayName: string;
  photoURL: string;
};

export interface SignInAction {
  type: Actions.SET_USER;
  user: TUser;
}

interface TInitialState {
  user: TUser;
}

const initialState: TInitialState = {
  user: {
    email: "",
    displayName: "",
    photoURL: "",
  },
};

const userReducer = (state = initialState, action: SignInAction) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
