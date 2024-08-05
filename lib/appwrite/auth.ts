import { ClientStore } from "./client";
import { Account, ID, Models, AppwriteException, Databases, Storage } from "react-native-appwrite";
import { Image } from "react-native";
import * as FileSystem from 'expo-file-system'

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
            console.log(appwriteError.message);
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

    // Format date to ISO 8601
    addUserToDatabase: async (userId: string, name: string, dob: string, gender: string, profilePicUri: string): Promise<{ user: Models.Document | null, err: Error | null }> => {
        // Upload profile picture
        const client = ClientStore.getClient();
        const storage = new Storage(client);
        const profilePicId = ID.unique();
        
        try {
            const response = await storage.createFile(
                '66a1de32000d3e999028',
                profilePicId,
                {
                    name: ID.unique(),
                    type: 'image/*',
                    size: await getImageSize(profilePicUri),
                    uri: profilePicUri,
                }
            );
        } catch (error) {
            console.log('Error uploading image:', error);
            return { user: null, err: new Error('Error uploading image') };
        }

        // Add user to database
        try {
            const databases = new Databases(client);
            const result = await databases.createDocument(
                '65ee687cf01728b70c24',
                '66a1d9dc0003240d73ba',
                ID.unique(),
                {
                    userId,
                    name,
                    dob,
                    gender,
                    profilePicId,
                }
            )
        } catch (error) {
            console.log('Error creating user:', error);
            return { user: null, err: new Error('Error creating user') };
        }

    },

    getUserSession: async () => {
        try {
            const client = ClientStore.getClient();
            const account = new Account(client);
            const session = await account.get();
            return session;
        } catch (error) {
            return null;
        }
    }

};