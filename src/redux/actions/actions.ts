import Actions from "./actionsType";

export const setUser = (payload: any) => {
  return {
    type: Actions.SET_USER,
    user: payload,
  };
};

export const setLoadingStatus = (status: boolean) => {
  return {
    type: Actions.SET_LOADING_STATUS,
    status,
  };
};

export const getArticles = (payload: any) => {
  return {
    type: Actions.GET_ARTICLES,
    payload,
  };
};
