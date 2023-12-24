import Actions from "./actionsType";

interface TSetUserAction {
  type: Actions.SET_USER;
  user: any;
}

export const setUser = (payload: any): TSetUserAction => {
  return {
    type: Actions.SET_USER,
    user: payload,
  };
};
