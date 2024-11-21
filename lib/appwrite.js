import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.rajdp.aora",
  projectId: "673f3d24002e494e4932",
  databaseId: "673f404a00059c49b53d",
  userCollectionId: "673f4077001ca8a72e32",
  videoCollectionId: "673f40a900035d0b8fad",
  storageId: "673f4cf900188ea1d47d",
};

let client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId) // Your Project ID
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) return Error("Account not created");

    const avatarsURL = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarsURL,
      }
    );
    return newUser;
  } catch (error) {
    console.error("error", error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
