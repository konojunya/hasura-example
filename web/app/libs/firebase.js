import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyAMs5ZJpv4XGsDmhGvRWQWsExFNhjk_sXw",
  authDomain: "hasura-example-with-firebase.firebaseapp.com",
  projectId: "hasura-example-with-firebase",
  storageBucket: "hasura-example-with-firebase.appspot.com",
  messagingSenderId: "885095428447",
  appId: "1:885095428447:web:70635e9650d8442acc46ea",
});

export function loginWithCustomToken(token) {
  const auth = getAuth();
  return signInWithCustomToken(auth, token);
}

export function loginWithEmailAndPassword(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}
