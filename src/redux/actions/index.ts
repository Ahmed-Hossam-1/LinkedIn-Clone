import { Dispatch } from "redux";
import { auth, db, provider, storage } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { getArticles, setLoadingStatus, setUser } from "./actions";
import { TArticle } from "../../types/type";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

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

export function postArticles(payload: TArticle) {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingStatus(true));
    // Post Article to DB
    if (payload.image) {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      // Upload Image to Storage if not connention error
      const uploadRef = uploadBytesResumable(storageRef, payload.image);
      uploadRef.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {
            const collectionRef = collection(db, "articles");
            addDoc(collectionRef, {
              actor: {
                title: payload.user.displayName,
                description: payload.user.email,
                Date: payload.timestamp,
                image: payload.user.photoURL,
              },
              commrnts: 0,
              description: payload.description,
              video: payload.video,
              sharedImg: downloadURL,
            });
          });
          dispatch(setLoadingStatus(false));
        }
      );
    } else if (payload.video) {
      const collectionRef = collection(db, "articles");
      addDoc(collectionRef, {
        actor: {
          title: payload.user.displayName,
          description: payload.user.email,
          Date: payload.timestamp,
          image: payload.user.photoURL,
        },
        commrnts: 0,
        description: payload.description,
        video: payload.video,
        sharedImg: payload.image,
      });
      dispatch(setLoadingStatus(false));
    } else {
      const collectionRef = collection(db, "articles");
      addDoc(collectionRef, {
        actor: {
          title: payload.user.displayName,
          description: payload.user.email,
          Date: payload.timestamp,
          image: payload.user.photoURL,
        },
        commrnts: 0,
        description: payload.description,
        video: payload.video,
        sharedImg: payload.image,
      });
      dispatch(setLoadingStatus(false));
    }
  };
}

export function getArticlesAPI() {
  return (dispatch: Dispatch) => {
    let payload;
    const collectionRef = collection(db, "articles");
    const orderedRef = query(collectionRef, orderBy("actor.Date", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      dispatch(getArticles(payload));
    });
  };
}
