import { ActionsArtical } from "../actions/actionsType";

interface IArticalState {
  loading: boolean;
  articals: any[];
}

const initialState: IArticalState = {
  loading: false,
  articals: [],
};

const articalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionsArtical.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case ActionsArtical.GET_ARTICLES:
      return {
        ...state,
        articals: action.payload,
      };
    default:
      return state;
  }
};

export default articalReducer;
