import { ClientStore } from "./client";
import { Account, ID, Models, AppwriteException, Databases, Storage } from "react-native-appwrite";
import { Image } from "react-native";
import * as FileSystem from 'expo-file-system'

const EDENOVA_DATABASE_ID = '66b65a1900113df20432'
const USER_COLLECTION_ID = '66b65a210028918eaddd'
const BASIC_BUCKET_ID = '66a1de32000d3e999028'

const getImageSize = async (uri: string): Promise<number> => {
    const file = await FileSystem.getInfoAsync(uri);
    return file.size;
}

export const authHandler = {
    getMobileToken: async (phone: string): Promise<{ token: Models.Token | null, err: Error | null }> => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            const token = await account.createPhoneToken(
                ID.unique(),
                phone,
            );
            return { token, err: null };
        } catch (error) {
            const appwriteError = error as AppwriteException;
            console.log("error with phone number",appwriteError.message);
            return { token: null, err: new Error(appwriteError.message) };
        }
    },

    verifyMobileToken: async (userId: string, secret: string): Promise<{ session: Models.Session | null, err: Error | null }> => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            const session = await account.createSession(
                userId,
                secret,
            );
            return { session, err: null };
        } catch (error) {
            const appwriteError = error as AppwriteException;
            console.log(appwriteError.message);
            return { session: null, err: new Error(appwriteError.message) };
        }
    },

    logout: async (): Promise<{ err: Error | null }> => {
        const client = ClientStore.getClient();
        const account = new Account(client);
        try {
            await account.deleteSessions();
            return { err: null };
        } catch (error) {
            console.log('Error logging out:', error);
            return { err: new Error('Error logging out') };
        }
    },


    // Format date to ISO 8601
    addUserToDatabase: async (userId: string, name: string, dob: string, gender: string): Promise<{ user: Models.Document | null, err: Error | null }> => {
        // Upload profile picture
        const client = ClientStore.getClient();
        const profilePicId = ID.unique();
        
        // Add user to database
        try {
            const databases = new Databases(client);
            const user = await databases.createDocument(
                EDENOVA_DATABASE_ID,
                USER_COLLECTION_ID,
                ID.unique(),
                {
                    userId,
                    name,
                    dob,
                    gender
                }
            )

            return { user, err: null };
        } catch (error) {
            console.log('Error creating user:', error);
            return { user: null, err: new Error('Error creating user') };
        }

    },


    uploadUserImage: async (userId: string, profilePicUri: string): Promise<{ profilePicId: string | null, err: Error | null }> => {
        const client = ClientStore.getClient();
        const storage = new Storage(client);
        const profilePicId = ID.unique();
        
        try {
            const response = await storage.createFile(
                BASIC_BUCKET_ID,
                profilePicId,
                {
                    name: ID.unique(),
                    type: 'image/*',
                    size: await getImageSize(profilePicUri),
                    uri: profilePicUri,
                }
            );
            return { profilePicId, err: null };
        } catch (error) {
            console.log('Error uploading image:', error);
            return { profilePicId: null, err: new Error('Error uploading image') };
        }
    },

    getUserSession: async (): Promise<{session: Models.User<Models.Preferences> | null, err: Error | null}> => {
        try {
            const client = ClientStore.getClient();
            const account = new Account(client);
            let session = await account.get();
            return {session, err: null};

        } catch (error) {
            return {session: null, err: new Error('Error getting user session')};
        }
    }
};