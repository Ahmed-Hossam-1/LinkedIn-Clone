import Actions from "../actions/actionsType";

interface TInitialState {
  user: any;
}

const initialState: TInitialState = {
  user: null,
};
const userReducer = (
  state = initialState,
  action: { type: any; user: any }
) => {
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
