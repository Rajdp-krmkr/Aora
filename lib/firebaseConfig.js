import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  where,
} from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collectManifestSchemes } from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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
export const SearchPosts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docref = collection(db, "videos");
      const q = query(docref);
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

export const createUser = async (email, password, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userObject = {
        email: email,
        username: username,
        Created: new Date(),
        Updated: new Date(),
        accountId: user.uid,
        name: user.displayName,
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjW2U_0sBq898zwuyEaZdKJQS84TCb6cTxuJPKo88TYGTstVMx2fjy9K2alO_NDMoHuWjWeAQs3fzbFnAeiRl8Jqw55sPyEmZ-AFW-PSz965KhTmwEn-RJ2OU9_yVV18cPoXhZbcbgjhDmRZa3Qbio00RIqd7MTkO7AN9G880gUvhko07CBDYr2RfDqVi4SMzek7GH3wA83D2ZQHdIgtzUz2zPr4zPGAx3SllIX4Kjr6anr2YRIfs5lqpGJQoNgjzwT4Rzu5CUvPXVyeVEGTdiIfUnOiy5Ukmu3yU9CMKwwD_yIWOQGOnD_btF1-yPF72h3TqmW3mMdDT2aaldSvq3gYdj2Gcuj9SIyUW20vlTzIKePUQfaSNnLtd6dr2i9tP6sK5QmQPk_On3TZgdaTrIOUQAPtn6oTPh-y6wpzukKDm4EbfpZKxVeoouwa44DtGy0HDh5i2gREkbu-_QfsQyIXeo0JqZWn_5uxIoHxKQjzw4QzEunpyUGXIuXUoj64z325s02shfwKDnc5Ty5Bt-z37UTcV4deUYf73EbppLnuUTdvB5eFpJEFXJ9L1HcO6XQS_YyZkMNu9bpE2g-JqEk16nI4DuKb6lgSuMFPLNGTKPy93zHV-mUN8eqixa8thj8kqwjao-qgcAD32WH9B_HbhSjUvAu-WDFAuDWqO3TY0eZokI3edCL_rmlLfTo1QTgK6Y0EdBRC1kR-i54kGfeTF43O1Stv7MONv3URDgtjnqIc7MiA-spZPSSQhOQ5V8oKnOffrjRb_AWXQq3Rjg3_emlzXPHjxQFxNUQygv4XO4KWDPqAQnMuOUPsxosKftgpjrdrK1P3vXzm6CW9uWe4DOMkPN7smXdcB6q5AbhG_FZ8S3uO5Gw6atjc3NTqJyc4HpuS31fvDpDBSdm8RLW9qy3caVtEPwbsVtloXJ6OOFMiDlxZ_whNr5uV-BuuwW4kiC1Z1OQj5V0Dnc4RJxGMrcQ=s96-c",
      };

      async function setUserFunc() {
        //TODO error handling
        //! set user function is not running properly
        console.log("User: ", userObject);
        await setDoc(doc(db, "users", user.uid), userObject)
          .then(() => {
            return userObject;
          })
          .catch((err) => {
            console.error("User error: ", err);
            throw new Error(err);
          });
      }
      setUserFunc();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
};

export const signIn = async (email, password) => {
  // try {
  //   const session = await account.createEmailPasswordSession(email, password);
  //   return session;
  // } catch (error) {
  //   throw new Error(error);
  // }
  await signInWithEmailAndPassword(auth, email, password)
    .then((session) => {
      return session;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
};

export const getCurrentUser = async () => {
  console.log("Getting current user...");
  try {
    // Wait for the auth state to change and retrieve the current user
    const currentAccount = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // Unsubscribe immediately after getting the user
        if (user) resolve(user);
      });
    });

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

export const getUSerPosts = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docref = collection(db, "videos");
      const q = query(docref, where("creator.userId", "==", userId));
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
