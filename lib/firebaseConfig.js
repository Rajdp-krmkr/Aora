import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collectManifestSchemes } from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_RKRudHYg6M6sBsBvGzjX4PeoEeYSDuI",
  authDomain: "aora-react-native-2024.firebaseapp.com",
  projectId: "aora-react-native-2024",
  storageBucket: "aora-react-native-2024.firebasestorage.app",
  messagingSenderId: "31066901187",
  appId: "1:31066901187:web:b2ae066a7033378fbd7076",
  measurementId: "G-BNEX1E9N2X",
};

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);

export const getAllPosts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docref = collection(db, "videos");
      const data = await getDocs(docref);
      let array = [];
      data.forEach((doc) => {
        array.push(doc.data());
      });
      resolve(array);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
export const getLatestPosts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docref = collection(db, "videos");
      const q = query(docref, orderBy("Created"), limit(7));
      const data = await getDocs(q);
      let array = [];
      data.forEach((doc) => {        
        array.push(doc.data());
      });
      resolve(array);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

// let client = new Client();
// client
//   .setEndpoint(appwriteConfig.endpoint)
//   .setProject(appwriteConfig.projectId) // Your Project ID
//   .setPlatform(appwriteConfig.platform);

// const account = new Account(client);
// const avatars = new Avatars(client);
// const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(
        "user",
        user.uid,
        user.email,
        user.displayName,
        "created and updated: ",
        new Date()
      );

      async function setUser() {
        
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          username: username,
          Created: new Date(),
          Updated: new Date(),
          accountId: user.uid,
          name: user.displayName,
        })
          .then(() => {
            console.log("user created succesfully");
          })
          .catch((err) => console.log("error in creating user", err));
      }
      setUser();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
};

// export const signIn = async (email, password) => {
//   try {
//     const session = await account.createEmailPasswordSession(email, password);
//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const getCurrentUser = async () => {
  try {
    // Wait for the auth state to change and retrieve the current user
    const currentAccount = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // Unsubscribe immediately after getting the user
        // console.log("User: ", user);
        if (user) resolve(user);
        // else reject(new Error("No user signed in"));
      });
    });

    // console.log("Authenticated User: ", currentAccount);

    // Fetch user data from Firestore
    const userDocRef = doc(db, "users", currentAccount.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User document not found in Firestore");
    }

    const currentUser = userDocSnap.data();
    // console.log("Current User Document: ", currentUser);

    return currentUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
