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

export function getUserAuth() {
  // Change User Account Status
  return (dispatch: Dispatch) => {
    auth.onAuthStateChanged(async (payload) => {
      if (payload) {
        dispatch(setUser(payload));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch: Dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => alert(error.message));
  };
}
