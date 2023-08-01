import { 
  child, 
  getDatabase ,
  ref,
  set,
  push,
  get,
  query,
  type Query,
  type QueryConstraint,
  orderByChild,
  equalTo
} from "firebase/database";
import { User } from "./User";
import {
  createUserWithEmailAndPassword,
  getAuth, 
  type UserCredential,
  type User as fbUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface IApi {
  registerUser: (user: User) => Promise<fbUser>;
  addUser: (user: User) => Promise<void>;
  loginUser: (user: User) => Promise<fbUser>;
  getUser: (userId: string) => Promise<User>;
  signOutUser: () => Promise<void>;
  listUsers: () => Promise<User[]>;
  updateUser: (updatedUser: User) => Promise<void>;
}

const dataBaseUrl: string = import.meta.env.VITE_FB_DB_URL;

const listUsers = async (): Promise<User[]> => {
  return await fetch(`${dataBaseUrl}/users.json`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const users: User[] = [];
      Object.keys(response).forEach((key: string) => {
        users.push(response[key])
      });
      return users;
    })
    .catch((error) => error);
}

const registerUser = (user: User): Promise<fbUser> =>
  createUserWithEmailAndPassword(getAuth(), user.email ?? "", user.password ?? "")
    .then((data: UserCredential) => {
      const db = getDatabase();
      user.id = data.user.uid;
      set(ref(db, `users/${data.user.uid}`), Object.assign(new User(), user))
      return data.user;
    })
    .catch((error) => {
      return error;
    });

const loginUser = (user: User): Promise<fbUser> =>
  signInWithEmailAndPassword(getAuth(), user.email ?? "", user.password ?? "")
    .then((data: UserCredential) => {
      return data.user;
    })
    .catch((error) => {
      console.log("spiError: " + error);
      return error;
    });

const addUser = async (user: User): Promise<void> => {
  // user.id = "temp-id";
  // console.log("new user: ", user);
  // const db = getDatabase();
  // const newPostKey = push(child(ref(db), 'users')).key;
  // await set(ref(db, `users/${newPostKey}`), Object.assign(new User(), user))
  // await fetch(`${dataBaseUrl}/users.json`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(user),
  // })
  //   .then((response) => response.json())
  //   .then((response) => console.log("response: ", response))
  //   .catch((error) => error);
};

// const getUser = async (userId: string): Promise<User> => 
//   await fetch(`${dataBaseUrl}/users.json?equalTo="${userId}"`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => response.json())
//   .then((response) => {
//     return response;
//   })
//   .catch((error) => error);

const getUser = async (userId: string): Promise<User> => {
  const db = getDatabase();
  const q = query(ref(db, 'users/'), orderByChild('id'), equalTo(userId));
  const resp = new User();
  await get(q).then((snapshot) => {
    snapshot.forEach((child) => {
      resp.id = child.val().id;
      resp.email = child.val().email;
      resp.isAdmin = child.val().isAdmin;
      resp.displayName = child.val().displayName;
      resp.firstName = child.val().firstName;
      resp.lastName = child.val().lastName;
      resp.photoUrl = child.val().photoUrl;
      resp.phoneNumber = child.val().phoneNumber;
    });
  }).catch((error) => {
    console.log(error);
  });
  return resp;
}

const capatilize = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1) ?? '';
};

const signOutUser = (): Promise<void> =>
  signOut(getAuth())
    .then((resp) => {
      console.log("resp: ", resp);
    })
    .catch((error) => error);

const updateUser = async (updatedUser: User): Promise<void> => 
// https://pp-vue-default-rtdb.firebaseio.com/users/-NXOBCORD6BBc5Xx9whw
// https://pp-vue-default-rtdb.firebaseio.com/users
  // await fetch(`${dataBaseUrl}/users/${updatedUser.id}.json`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(updatedUser)
  // })
  // .then((response) => response.json())
  // .then((response) => {
  //   return response;
  // })
  // .catch((error) => error);
  {
    const db = getDatabase();
    set(ref(db, `users/${updatedUser.id}`), updatedUser)
  }

export const api: IApi = {
  registerUser,
  addUser,
  loginUser,
  getUser,
  signOutUser,
  listUsers,
  updateUser
};

export default api;
