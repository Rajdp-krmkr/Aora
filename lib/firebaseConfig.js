// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_RKRudHYg6M6sBsBvGzjX4PeoEeYSDuI",
  authDomain: "aora-react-native-2024.firebaseapp.com",
  projectId: "aora-react-native-2024",
  storageBucket: "aora-react-native-2024.firebasestorage.app",
  messagingSenderId: "31066901187",
  appId: "1:31066901187:web:b2ae066a7033378fbd7076",
  measurementId: "G-BNEX1E9N2X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);

// let client = new Client();
// client
//   .setEndpoint(appwriteConfig.endpoint)
//   .setProject(appwriteConfig.projectId) // Your Project ID
//   .setPlatform(appwriteConfig.platform);

// const account = new Account(client);
// const avatars = new Avatars(client);
// const databases = new Databases(client);

// export const createUser = async (email, password, username) => {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       username
//     );
//     if (!newAccount) return Error("Account not created");

//     const avatarsURL = avatars.getInitials(username);
//     await signIn(email, password);

//     const newUser = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       {
//         accountId: newAccount.$id,
//         email,
//         username,
//         avatar: avatarsURL,
//       }
//     );
//     return newUser;
//   } catch (error) {
//     console.error("error", error);
//   }
// };

// export const signIn = async (email, password) => {
//   try {
//     const session = await account.createEmailPasswordSession(email, password);
//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     const currentAccount = await account.get();
//     if (!currentAccount) throw Error("Account not found");

//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     if (!currentUser) throw Error("User not found");

//     return currentUser.documents[0];
//   } catch (error) {
//     console.error("error", error);
//   }
// };
