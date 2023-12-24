import { Dispatch } from "redux";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { setUser } from "./actions";

export function siginAPI() {
  return (dispatch: Dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}
