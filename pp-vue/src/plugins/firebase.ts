import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const fbConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FB_DB_URL,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID,
    measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
}

const firebaseApp = initializeApp(fbConfig);
export const fbAuth = getAuth(firebaseApp);

export const fs = getFirestore(firebaseApp);


export async function getCurrentUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    if (fbAuth.currentUser) {
      resolve(fbAuth.currentUser)
      return
    }
    const removeListener = onAuthStateChanged(
      fbAuth,
      (user) => {
        removeListener();
        resolve(user as User);
      },
      reject
    )
  })
}