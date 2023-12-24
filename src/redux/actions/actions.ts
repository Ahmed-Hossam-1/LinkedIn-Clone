import Actions from "./actionsType";

export const setUser = (payload: any) => {
  return {
    type: Actions.SET_USER,
    user: payload,
  };
};
